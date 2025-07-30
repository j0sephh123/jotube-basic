import { Test, TestingModule } from '@nestjs/testing';
import { DirectoryService } from './directory.service';
import { FilePathService } from './file-path.service';
import * as fs from 'fs/promises';
import * as fsSync from 'fs';

jest.mock('fs/promises');
jest.mock('fs');

describe('DirectoryService', () => {
  let service: DirectoryService;

  const mockFilePathService = {
    getBasePath: jest.fn(),
    getPublicFolder: jest.fn(),
  };

  beforeEach(async () => {
    jest.spyOn(console, 'log').mockImplementation(() => {});

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DirectoryService,
        {
          provide: FilePathService,
          useValue: mockFilePathService,
        },
      ],
    }).compile();

    service = module.get<DirectoryService>(DirectoryService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('createDirectory', () => {
    it('should create directory successfully', async () => {
      const directoryPath = '/test/path';
      const mockMkdir = fs.mkdir as jest.MockedFunction<typeof fs.mkdir>;
      mockMkdir.mockResolvedValue(undefined);

      await service.createDirectory(directoryPath);

      expect(mockMkdir).toHaveBeenCalledWith(directoryPath, {
        recursive: true,
      });
    });

    it('should throw error when directory creation fails', async () => {
      const directoryPath = '/test/path';
      const mockError = new Error('Permission denied');
      const mockMkdir = fs.mkdir as jest.MockedFunction<typeof fs.mkdir>;
      mockMkdir.mockRejectedValue(mockError);

      await expect(service.createDirectory(directoryPath)).rejects.toThrow(
        'Permission denied',
      );
      expect(mockMkdir).toHaveBeenCalledWith(directoryPath, {
        recursive: true,
      });
    });

    it('should handle nested directory creation', async () => {
      const directoryPath = '/test/nested/deep/path';
      const mockMkdir = fs.mkdir as jest.MockedFunction<typeof fs.mkdir>;
      mockMkdir.mockResolvedValue(undefined);

      await service.createDirectory(directoryPath);

      expect(mockMkdir).toHaveBeenCalledWith(directoryPath, {
        recursive: true,
      });
    });
  });

  describe('deleteDirectory', () => {
    it('should delete directory when it exists', async () => {
      const directoryPath = '/test/path';
      const mockRm = fs.rm as jest.MockedFunction<typeof fs.rm>;
      mockRm.mockResolvedValue(undefined);

      jest.spyOn(service, 'directoryExistsSafe').mockResolvedValue(true);

      await service.deleteDirectory(directoryPath);

      expect(service.directoryExistsSafe).toHaveBeenCalledWith(directoryPath);
      expect(mockRm).toHaveBeenCalledWith(directoryPath, { recursive: true });
    });

    it('should not delete directory when it does not exist', async () => {
      const directoryPath = '/test/path';
      const mockRm = fs.rm as jest.MockedFunction<typeof fs.rm>;

      jest.spyOn(service, 'directoryExistsSafe').mockResolvedValue(false);

      await service.deleteDirectory(directoryPath);

      expect(service.directoryExistsSafe).toHaveBeenCalledWith(directoryPath);
      expect(mockRm).not.toHaveBeenCalled();
    });

    it('should handle deletion error gracefully', async () => {
      const directoryPath = '/test/path';
      const mockRm = fs.rm as jest.MockedFunction<typeof fs.rm>;
      mockRm.mockRejectedValue(new Error('Deletion failed'));

      jest.spyOn(service, 'directoryExistsSafe').mockResolvedValue(true);

      await expect(
        service.deleteDirectory(directoryPath),
      ).resolves.toBeUndefined();

      expect(service.directoryExistsSafe).toHaveBeenCalledWith(directoryPath);
      expect(mockRm).toHaveBeenCalledWith(directoryPath, { recursive: true });
    });

    it('should handle directoryExistsSafe error gracefully', async () => {
      const directoryPath = '/test/path';
      const mockRm = fs.rm as jest.MockedFunction<typeof fs.rm>;

      jest
        .spyOn(service, 'directoryExistsSafe')
        .mockRejectedValue(new Error('Stat failed'));

      await expect(
        service.deleteDirectory(directoryPath),
      ).resolves.toBeUndefined();

      expect(service.directoryExistsSafe).toHaveBeenCalledWith(directoryPath);
      expect(mockRm).not.toHaveBeenCalled();
    });
  });

  describe('deleteVideoDirectory', () => {
    it('should delete video directory successfully', async () => {
      const ytChannelId = 'UC123456789';
      const ytVideoId = 'video123';
      const basePath = '/base/path';
      const expectedPath = `${basePath}/${ytChannelId}/${ytVideoId}`;

      mockFilePathService.getBasePath.mockReturnValue(basePath);
      jest.spyOn(service, 'deleteDirectory').mockResolvedValue(undefined);

      await service.deleteVideoDirectory(ytChannelId, ytVideoId);

      expect(mockFilePathService.getBasePath).toHaveBeenCalled();
      expect(service.deleteDirectory).toHaveBeenCalledWith(expectedPath);
    });

    it('should construct correct path for video directory deletion', async () => {
      const ytChannelId = 'UC987654321';
      const ytVideoId = 'video456';
      const basePath = '/custom/base/path';
      const expectedPath = `${basePath}/${ytChannelId}/${ytVideoId}`;

      mockFilePathService.getBasePath.mockReturnValue(basePath);
      jest.spyOn(service, 'deleteDirectory').mockResolvedValue(undefined);

      await service.deleteVideoDirectory(ytChannelId, ytVideoId);

      expect(service.deleteDirectory).toHaveBeenCalledWith(expectedPath);
    });

    it('should handle deleteDirectory error', async () => {
      const ytChannelId = 'UC123456789';
      const ytVideoId = 'video123';
      const basePath = '/base/path';

      mockFilePathService.getBasePath.mockReturnValue(basePath);
      jest
        .spyOn(service, 'deleteDirectory')
        .mockRejectedValue(new Error('Delete failed'));

      await expect(
        service.deleteVideoDirectory(ytChannelId, ytVideoId),
      ).rejects.toThrow('Delete failed');
    });
  });

  describe('directoryExistsSafe', () => {
    it('should return true when directory exists', async () => {
      const directoryPath = '/test/path';
      const mockStat = fs.stat as jest.MockedFunction<typeof fs.stat>;
      const mockStats = {
        isDirectory: jest.fn().mockReturnValue(true),
      };
      mockStat.mockResolvedValue(mockStats as any);

      const result = await service.directoryExistsSafe(directoryPath);

      expect(mockStat).toHaveBeenCalledWith(directoryPath);
      expect(mockStats.isDirectory).toHaveBeenCalled();
      expect(result).toBe(true);
    });

    it('should return false when path exists but is not a directory', async () => {
      const directoryPath = '/test/file.txt';
      const mockStat = fs.stat as jest.MockedFunction<typeof fs.stat>;
      const mockStats = {
        isDirectory: jest.fn().mockReturnValue(false),
      };
      mockStat.mockResolvedValue(mockStats as any);

      const result = await service.directoryExistsSafe(directoryPath);

      expect(mockStat).toHaveBeenCalledWith(directoryPath);
      expect(mockStats.isDirectory).toHaveBeenCalled();
      expect(result).toBe(false);
    });

    it('should return false when directory does not exist', async () => {
      const directoryPath = '/nonexistent/path';
      const mockStat = fs.stat as jest.MockedFunction<typeof fs.stat>;
      mockStat.mockRejectedValue(new Error('ENOENT'));

      const result = await service.directoryExistsSafe(directoryPath);

      expect(mockStat).toHaveBeenCalledWith(directoryPath);
      expect(result).toBe(false);
    });

    it('should return false when stat throws any error', async () => {
      const directoryPath = '/test/path';
      const mockStat = fs.stat as jest.MockedFunction<typeof fs.stat>;
      mockStat.mockRejectedValue(new Error('Permission denied'));

      const result = await service.directoryExistsSafe(directoryPath);

      expect(mockStat).toHaveBeenCalledWith(directoryPath);
      expect(result).toBe(false);
    });
  });

  describe('deleteDirSync', () => {
    it('should delete directory synchronously and return true', () => {
      const ytChannelId = 'UC123456789';
      const ytVideoId = 'video123';
      const basePath = '/base/path';
      const expectedPath = `${basePath}/${ytChannelId}/${ytVideoId}`;
      const mockRmdirSync = fsSync.rmdirSync as jest.MockedFunction<
        typeof fsSync.rmdirSync
      >;

      mockFilePathService.getBasePath.mockReturnValue(basePath);
      mockRmdirSync.mockReturnValue(undefined);

      const result = service.deleteDirSync({ ytChannelId, ytVideoId });

      expect(mockFilePathService.getBasePath).toHaveBeenCalled();
      expect(mockRmdirSync).toHaveBeenCalledWith(expectedPath, {
        recursive: true,
      });
      expect(result).toBe(true);
    });

    it('should return false when directory deletion fails', () => {
      const ytChannelId = 'UC123456789';
      const ytVideoId = 'video123';
      const basePath = '/base/path';
      const mockRmdirSync = fsSync.rmdirSync as jest.MockedFunction<
        typeof fsSync.rmdirSync
      >;

      mockFilePathService.getBasePath.mockReturnValue(basePath);
      mockRmdirSync.mockImplementation(() => {
        throw new Error('Directory not found');
      });

      const result = service.deleteDirSync({ ytChannelId, ytVideoId });

      expect(mockRmdirSync).toHaveBeenCalled();
      expect(result).toBe(false);
    });

    it('should construct correct path for synchronous deletion', () => {
      const ytChannelId = 'UC987654321';
      const ytVideoId = 'video456';
      const basePath = '/custom/base/path';
      const expectedPath = `${basePath}/${ytChannelId}/${ytVideoId}`;
      const mockRmdirSync = fsSync.rmdirSync as jest.MockedFunction<
        typeof fsSync.rmdirSync
      >;

      mockFilePathService.getBasePath.mockReturnValue(basePath);
      mockRmdirSync.mockReturnValue(undefined);

      service.deleteDirSync({ ytChannelId, ytVideoId });

      expect(mockRmdirSync).toHaveBeenCalledWith(expectedPath, {
        recursive: true,
      });
    });

    it('should handle permission error gracefully', () => {
      const ytChannelId = 'UC123456789';
      const ytVideoId = 'video123';
      const basePath = '/base/path';
      const mockRmdirSync = fsSync.rmdirSync as jest.MockedFunction<
        typeof fsSync.rmdirSync
      >;

      mockFilePathService.getBasePath.mockReturnValue(basePath);
      mockRmdirSync.mockImplementation(() => {
        throw new Error('Permission denied');
      });

      const result = service.deleteDirSync({ ytChannelId, ytVideoId });

      expect(result).toBe(false);
    });
  });
});
