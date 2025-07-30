import { Test, TestingModule } from '@nestjs/testing';
import { FileOperationService } from './file-operation.service';
import { FilePathService } from './file-path.service';
import * as fs from 'fs/promises';

jest.mock('fs/promises');

describe('FileOperationService', () => {
  let service: FileOperationService;

  const mockFilePathService = {
    getBasePath: jest.fn(),
    getPublicFolder: jest.fn(),
  };

  beforeEach(async () => {
    jest.spyOn(console, 'log').mockImplementation(() => {});

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FileOperationService,
        {
          provide: FilePathService,
          useValue: mockFilePathService,
        },
      ],
    }).compile();

    service = module.get<FileOperationService>(FileOperationService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('fileExists', () => {
    it('should not throw when file exists', async () => {
      const filePath = '/test/file.txt';
      const mockAccess = fs.access as jest.MockedFunction<typeof fs.access>;
      mockAccess.mockResolvedValue(undefined);

      await expect(service.fileExists(filePath)).resolves.toBeUndefined();

      expect(mockAccess).toHaveBeenCalledWith(filePath);
    });

    it('should throw error when file does not exist', async () => {
      const filePath = '/test/nonexistent.txt';
      const mockError = new Error('ENOENT: no such file or directory');
      const mockAccess = fs.access as jest.MockedFunction<typeof fs.access>;
      mockAccess.mockRejectedValue(mockError);

      await expect(service.fileExists(filePath)).rejects.toThrow(
        'ENOENT: no such file or directory',
      );
      expect(mockAccess).toHaveBeenCalledWith(filePath);
    });

    it('should throw error when access is denied', async () => {
      const filePath = '/protected/file.txt';
      const mockError = new Error('EACCES: permission denied');
      const mockAccess = fs.access as jest.MockedFunction<typeof fs.access>;
      mockAccess.mockRejectedValue(mockError);

      await expect(service.fileExists(filePath)).rejects.toThrow(
        'EACCES: permission denied',
      );
      expect(mockAccess).toHaveBeenCalledWith(filePath);
    });
  });

  describe('fileExistsSafe', () => {
    it('should return true when file exists', async () => {
      const filePath = '/test/file.txt';
      const mockAccess = fs.access as jest.MockedFunction<typeof fs.access>;
      mockAccess.mockResolvedValue(undefined);

      const result = await service.fileExistsSafe(filePath);

      expect(mockAccess).toHaveBeenCalledWith(filePath);
      expect(result).toBe(true);
    });

    it('should return false when file does not exist', async () => {
      const filePath = '/test/nonexistent.txt';
      const mockAccess = fs.access as jest.MockedFunction<typeof fs.access>;
      mockAccess.mockRejectedValue(new Error('ENOENT'));

      const result = await service.fileExistsSafe(filePath);

      expect(mockAccess).toHaveBeenCalledWith(filePath);
      expect(result).toBe(false);
    });

    it('should return false when access is denied', async () => {
      const filePath = '/protected/file.txt';
      const mockAccess = fs.access as jest.MockedFunction<typeof fs.access>;
      mockAccess.mockRejectedValue(new Error('EACCES'));

      const result = await service.fileExistsSafe(filePath);

      expect(mockAccess).toHaveBeenCalledWith(filePath);
      expect(result).toBe(false);
    });

    it('should return false for any error', async () => {
      const filePath = '/test/file.txt';
      const mockAccess = fs.access as jest.MockedFunction<typeof fs.access>;
      mockAccess.mockRejectedValue(new Error('Any other error'));

      const result = await service.fileExistsSafe(filePath);

      expect(mockAccess).toHaveBeenCalledWith(filePath);
      expect(result).toBe(false);
    });
  });

  describe('deleteFile', () => {
    it('should delete file successfully', async () => {
      const filePath = '/test/file.txt';
      const mockUnlink = fs.unlink as jest.MockedFunction<typeof fs.unlink>;
      mockUnlink.mockResolvedValue(undefined);

      await service.deleteFile(filePath);

      expect(mockUnlink).toHaveBeenCalledWith(filePath);
    });

    it('should throw error when file does not exist', async () => {
      const filePath = '/test/nonexistent.txt';
      const mockError = new Error('ENOENT: no such file or directory');
      const mockUnlink = fs.unlink as jest.MockedFunction<typeof fs.unlink>;
      mockUnlink.mockRejectedValue(mockError);

      await expect(service.deleteFile(filePath)).rejects.toThrow(
        'ENOENT: no such file or directory',
      );
      expect(mockUnlink).toHaveBeenCalledWith(filePath);
    });

    it('should throw error when permission is denied', async () => {
      const filePath = '/protected/file.txt';
      const mockError = new Error('EACCES: permission denied');
      const mockUnlink = fs.unlink as jest.MockedFunction<typeof fs.unlink>;
      mockUnlink.mockRejectedValue(mockError);

      await expect(service.deleteFile(filePath)).rejects.toThrow(
        'EACCES: permission denied',
      );
      expect(mockUnlink).toHaveBeenCalledWith(filePath);
    });

    it('should throw error when file is in use', async () => {
      const filePath = '/test/busy.txt';
      const mockError = new Error('EBUSY: resource busy');
      const mockUnlink = fs.unlink as jest.MockedFunction<typeof fs.unlink>;
      mockUnlink.mockRejectedValue(mockError);

      await expect(service.deleteFile(filePath)).rejects.toThrow(
        'EBUSY: resource busy',
      );
      expect(mockUnlink).toHaveBeenCalledWith(filePath);
    });
  });

  describe('deleteDirectory', () => {
    it('should delete directory successfully', async () => {
      const dirPath = '/test/directory';
      const mockRm = fs.rm as jest.MockedFunction<typeof fs.rm>;
      mockRm.mockResolvedValue(undefined);

      await service.deleteDirectory(dirPath);

      expect(mockRm).toHaveBeenCalledWith(dirPath, {
        recursive: true,
        force: true,
      });
    });

    it('should throw error when directory does not exist', async () => {
      const dirPath = '/test/nonexistent';
      const mockError = new Error('ENOENT: no such file or directory');
      const mockRm = fs.rm as jest.MockedFunction<typeof fs.rm>;
      mockRm.mockRejectedValue(mockError);

      await expect(service.deleteDirectory(dirPath)).rejects.toThrow(
        'ENOENT: no such file or directory',
      );
      expect(mockRm).toHaveBeenCalledWith(dirPath, {
        recursive: true,
        force: true,
      });
    });

    it('should throw error when permission is denied', async () => {
      const dirPath = '/protected/directory';
      const mockError = new Error('EACCES: permission denied');
      const mockRm = fs.rm as jest.MockedFunction<typeof fs.rm>;
      mockRm.mockRejectedValue(mockError);

      await expect(service.deleteDirectory(dirPath)).rejects.toThrow(
        'EACCES: permission denied',
      );
      expect(mockRm).toHaveBeenCalledWith(dirPath, {
        recursive: true,
        force: true,
      });
    });

    it('should throw error when directory is not empty and recursive fails', async () => {
      const dirPath = '/test/nonempty';
      const mockError = new Error('ENOTEMPTY: directory not empty');
      const mockRm = fs.rm as jest.MockedFunction<typeof fs.rm>;
      mockRm.mockRejectedValue(mockError);

      await expect(service.deleteDirectory(dirPath)).rejects.toThrow(
        'ENOTEMPTY: directory not empty',
      );
      expect(mockRm).toHaveBeenCalledWith(dirPath, {
        recursive: true,
        force: true,
      });
    });
  });

  describe('handleCopyImage', () => {
    it('should copy image successfully', async () => {
      const sourcePath = '/source/image.jpg';
      const destination = '/destination/image.jpg';
      const mockCopyFile = fs.copyFile as jest.MockedFunction<
        typeof fs.copyFile
      >;
      mockCopyFile.mockResolvedValue(undefined);

      await service.handleCopyImage(sourcePath, destination);

      expect(mockCopyFile).toHaveBeenCalledWith(sourcePath, destination);
    });

    it('should throw error when source file does not exist', async () => {
      const sourcePath = '/source/nonexistent.jpg';
      const destination = '/destination/image.jpg';
      const mockError = new Error('ENOENT: no such file or directory');
      const mockCopyFile = fs.copyFile as jest.MockedFunction<
        typeof fs.copyFile
      >;
      mockCopyFile.mockRejectedValue(mockError);

      await expect(
        service.handleCopyImage(sourcePath, destination),
      ).rejects.toThrow('ENOENT: no such file or directory');
      expect(mockCopyFile).toHaveBeenCalledWith(sourcePath, destination);
    });

    it('should throw error when destination directory does not exist', async () => {
      const sourcePath = '/source/image.jpg';
      const destination = '/nonexistent/destination/image.jpg';
      const mockError = new Error('ENOENT: no such file or directory');
      const mockCopyFile = fs.copyFile as jest.MockedFunction<
        typeof fs.copyFile
      >;
      mockCopyFile.mockRejectedValue(mockError);

      await expect(
        service.handleCopyImage(sourcePath, destination),
      ).rejects.toThrow('ENOENT: no such file or directory');
      expect(mockCopyFile).toHaveBeenCalledWith(sourcePath, destination);
    });

    it('should throw error when permission is denied', async () => {
      const sourcePath = '/protected/image.jpg';
      const destination = '/destination/image.jpg';
      const mockError = new Error('EACCES: permission denied');
      const mockCopyFile = fs.copyFile as jest.MockedFunction<
        typeof fs.copyFile
      >;
      mockCopyFile.mockRejectedValue(mockError);

      await expect(
        service.handleCopyImage(sourcePath, destination),
      ).rejects.toThrow('EACCES: permission denied');
      expect(mockCopyFile).toHaveBeenCalledWith(sourcePath, destination);
    });

    it('should throw error when disk space is insufficient', async () => {
      const sourcePath = '/source/large-image.jpg';
      const destination = '/destination/image.jpg';
      const mockError = new Error('ENOSPC: no space left on device');
      const mockCopyFile = fs.copyFile as jest.MockedFunction<
        typeof fs.copyFile
      >;
      mockCopyFile.mockRejectedValue(mockError);

      await expect(
        service.handleCopyImage(sourcePath, destination),
      ).rejects.toThrow('ENOSPC: no space left on device');
      expect(mockCopyFile).toHaveBeenCalledWith(sourcePath, destination);
    });
  });

  describe('listFiles', () => {
    it('should list files in directory successfully', async () => {
      const directoryPath = '/test/directory';
      const mockFiles = ['file1.txt', 'file2.jpg', 'subdirectory'];
      const mockReaddir = fs.readdir as jest.MockedFunction<typeof fs.readdir>;
      mockReaddir.mockResolvedValue(mockFiles as any);

      const result = await service.listFiles(directoryPath);

      expect(mockReaddir).toHaveBeenCalledWith(directoryPath);
      expect(result).toEqual(mockFiles);
    });

    it('should return empty array for empty directory', async () => {
      const directoryPath = '/test/empty';
      const mockReaddir = fs.readdir as jest.MockedFunction<typeof fs.readdir>;
      mockReaddir.mockResolvedValue([] as any);

      const result = await service.listFiles(directoryPath);

      expect(mockReaddir).toHaveBeenCalledWith(directoryPath);
      expect(result).toEqual([]);
    });

    it('should throw error when directory does not exist', async () => {
      const directoryPath = '/test/nonexistent';
      const mockError = new Error('ENOENT: no such file or directory');
      const mockReaddir = fs.readdir as jest.MockedFunction<typeof fs.readdir>;
      mockReaddir.mockRejectedValue(mockError);

      await expect(service.listFiles(directoryPath)).rejects.toThrow(
        'ENOENT: no such file or directory',
      );
      expect(mockReaddir).toHaveBeenCalledWith(directoryPath);
    });

    it('should throw error when path is not a directory', async () => {
      const directoryPath = '/test/file.txt';
      const mockError = new Error('ENOTDIR: not a directory');
      const mockReaddir = fs.readdir as jest.MockedFunction<typeof fs.readdir>;
      mockReaddir.mockRejectedValue(mockError);

      await expect(service.listFiles(directoryPath)).rejects.toThrow(
        'ENOTDIR: not a directory',
      );
      expect(mockReaddir).toHaveBeenCalledWith(directoryPath);
    });

    it('should throw error when permission is denied', async () => {
      const directoryPath = '/protected/directory';
      const mockError = new Error('EACCES: permission denied');
      const mockReaddir = fs.readdir as jest.MockedFunction<typeof fs.readdir>;
      mockReaddir.mockRejectedValue(mockError);

      await expect(service.listFiles(directoryPath)).rejects.toThrow(
        'EACCES: permission denied',
      );
      expect(mockReaddir).toHaveBeenCalledWith(directoryPath);
    });

    it('should handle files with special characters', async () => {
      const directoryPath = '/test/directory';
      const mockFiles = [
        'file with spaces.txt',
        'file-with-dashes.jpg',
        'file_with_underscores.png',
      ];
      const mockReaddir = fs.readdir as jest.MockedFunction<typeof fs.readdir>;
      mockReaddir.mockResolvedValue(mockFiles as any);

      const result = await service.listFiles(directoryPath);

      expect(mockReaddir).toHaveBeenCalledWith(directoryPath);
      expect(result).toEqual(mockFiles);
    });
  });
});
