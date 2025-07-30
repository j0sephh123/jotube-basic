import { Test, TestingModule } from '@nestjs/testing';
import { ScreenshotsManagerService } from './screenshots-manager.service';
import { FilePathService } from 'src/file/file-path.service';
import { DirectoryService } from 'src/file/directory.service';
import { FileOperationService } from 'src/file/file-operation.service';
import * as fs from 'fs';
import * as path from 'path';

jest.mock('path', () => ({
  join: jest.requireActual('path').join,
  extname: jest.requireActual('path').extname,
}));

jest.mock('fs', () => ({
  accessSync: jest.fn(),
  unlinkSync: jest.fn(),
  existsSync: jest.fn(),
  mkdirSync: jest.fn(),
  readdirSync: jest.fn(),
}));

describe('ScreenshotsManagerService', () => {
  let service: ScreenshotsManagerService;

  const mockFilePathService = {
    getBasePath: jest.fn(),
  };

  const mockDirectoryService = {
    createDirectory: jest.fn(),
    deleteDirectory: jest.fn(),
  };

  const mockFileOperationService = {
    handleCopyImage: jest.fn(),
    fileExists: jest.fn(),
  };

  beforeEach(async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScreenshotsManagerService,
        {
          provide: FilePathService,
          useValue: mockFilePathService,
        },
        {
          provide: DirectoryService,
          useValue: mockDirectoryService,
        },
        {
          provide: FileOperationService,
          useValue: mockFileOperationService,
        },
      ],
    }).compile();

    service = module.get<ScreenshotsManagerService>(ScreenshotsManagerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('deleteFileSync', () => {
    it('should delete file successfully and return true', () => {
      const ytChannelId = 'UC123456789';
      const ytVideoId = 'video123';
      const videoName = 'test-video.mp4';
      const basePath = '/base/path';
      const expectedPath = `${basePath}/${ytChannelId}/${ytVideoId}/saved_screenshots/${videoName}`;

      mockFilePathService.getBasePath.mockReturnValue(basePath);
      (fs.accessSync as jest.Mock).mockImplementation(() => {});
      (fs.unlinkSync as jest.Mock).mockImplementation(() => {});

      const result = service.deleteFileSync({
        ytChannelId,
        ytVideoId,
        videoName,
      });

      expect(mockFilePathService.getBasePath).toHaveBeenCalled();
      expect(fs.accessSync).toHaveBeenCalledWith(expectedPath);
      expect(fs.unlinkSync).toHaveBeenCalledWith(expectedPath);
      expect(result).toBe(true);
    });

    it('should return false when file does not exist', () => {
      const ytChannelId = 'UC123456789';
      const ytVideoId = 'video123';
      const videoName = 'nonexistent-video.mp4';
      const basePath = '/base/path';

      mockFilePathService.getBasePath.mockReturnValue(basePath);
      (fs.accessSync as jest.Mock).mockImplementation(() => {
        throw new Error('ENOENT');
      });

      const result = service.deleteFileSync({
        ytChannelId,
        ytVideoId,
        videoName,
      });

      expect(fs.accessSync).toHaveBeenCalled();
      expect(result).toBe(false);
    });

    it('should return false when unlink fails', () => {
      const ytChannelId = 'UC123456789';
      const ytVideoId = 'video123';
      const videoName = 'test-video.mp4';
      const basePath = '/base/path';

      mockFilePathService.getBasePath.mockReturnValue(basePath);
      (fs.accessSync as jest.Mock).mockImplementation(() => {});
      (fs.unlinkSync as jest.Mock).mockImplementation(() => {
        throw new Error('Permission denied');
      });

      const result = service.deleteFileSync({
        ytChannelId,
        ytVideoId,
        videoName,
      });

      expect(fs.accessSync).toHaveBeenCalled();
      expect(fs.unlinkSync).toHaveBeenCalled();
      expect(result).toBe(false);
    });

    it('should construct correct file path', () => {
      const ytChannelId = 'UC987654321';
      const ytVideoId = 'video456';
      const videoName = 'custom-video.mp4';
      const basePath = '/custom/base/path';
      const expectedPath = `${basePath}/${ytChannelId}/${ytVideoId}/saved_screenshots/${videoName}`;

      mockFilePathService.getBasePath.mockReturnValue(basePath);
      (fs.accessSync as jest.Mock).mockImplementation(() => {});
      (fs.unlinkSync as jest.Mock).mockImplementation(() => {});

      service.deleteFileSync({ ytChannelId, ytVideoId, videoName });

      expect(fs.accessSync).toHaveBeenCalledWith(expectedPath);
      expect(fs.unlinkSync).toHaveBeenCalledWith(expectedPath);
    });
  });

  describe('deleteScreenshot', () => {
    it('should delete screenshot successfully and return true', () => {
      const ytChannelId = 'UC123456789';
      const ytVideoId = 'video123';
      const second = 30;
      const basePath = '/base/path';
      const fileName = `${ytVideoId}-${second}.png`;
      const expectedPath = `${basePath}/${ytChannelId}/${ytVideoId}/saved_screenshots/${fileName}`;

      mockFilePathService.getBasePath.mockReturnValue(basePath);
      (fs.accessSync as jest.Mock).mockImplementation(() => {});
      (fs.unlinkSync as jest.Mock).mockImplementation(() => {});

      const result = service.deleteScreenshot(ytChannelId, ytVideoId, second);

      expect(mockFilePathService.getBasePath).toHaveBeenCalled();
      expect(fs.accessSync).toHaveBeenCalledWith(expectedPath);
      expect(fs.unlinkSync).toHaveBeenCalledWith(expectedPath);
      expect(result).toBe(true);
    });

    it('should return false when screenshot does not exist', () => {
      const ytChannelId = 'UC123456789';
      const ytVideoId = 'video123';
      const second = 30;
      const basePath = '/base/path';

      mockFilePathService.getBasePath.mockReturnValue(basePath);
      (fs.accessSync as jest.Mock).mockImplementation(() => {
        throw new Error('ENOENT');
      });

      const result = service.deleteScreenshot(ytChannelId, ytVideoId, second);

      expect(fs.accessSync).toHaveBeenCalled();
      expect(result).toBe(false);
    });

    it('should return false when unlink fails', () => {
      const ytChannelId = 'UC123456789';
      const ytVideoId = 'video123';
      const second = 30;
      const basePath = '/base/path';

      mockFilePathService.getBasePath.mockReturnValue(basePath);
      (fs.accessSync as jest.Mock).mockImplementation(() => {});
      (fs.unlinkSync as jest.Mock).mockImplementation(() => {
        throw new Error('Permission denied');
      });

      const result = service.deleteScreenshot(ytChannelId, ytVideoId, second);

      expect(fs.accessSync).toHaveBeenCalled();
      expect(fs.unlinkSync).toHaveBeenCalled();
      expect(result).toBe(false);
    });

    it('should construct correct screenshot path', () => {
      const ytChannelId = 'UC987654321';
      const ytVideoId = 'video456';
      const second = 45;
      const basePath = '/custom/base/path';
      const fileName = `${ytVideoId}-${second}.png`;
      const expectedPath = `${basePath}/${ytChannelId}/${ytVideoId}/saved_screenshots/${fileName}`;

      mockFilePathService.getBasePath.mockReturnValue(basePath);
      (fs.accessSync as jest.Mock).mockImplementation(() => {});
      (fs.unlinkSync as jest.Mock).mockImplementation(() => {});

      service.deleteScreenshot(ytChannelId, ytVideoId, second);

      expect(fs.accessSync).toHaveBeenCalledWith(expectedPath);
      expect(fs.unlinkSync).toHaveBeenCalledWith(expectedPath);
    });
  });

  describe('getPaths', () => {
    it('should return correct paths and create directories', () => {
      const ytChannelId = 'UC123456789';
      const ytVideoId = 'video123';
      const basePath = '/base/path';
      const channelBase = `${basePath}/${ytChannelId}`;
      const idFolderPath = path.join(channelBase, ytVideoId);
      const screenshotsPath = path.join(idFolderPath, 'all_screenshots');
      const videoFilePath = 'test-video.mp4';
      const videoPath = path.join(idFolderPath, videoFilePath);

      mockFilePathService.getBasePath.mockReturnValue(basePath);
      jest.spyOn(service, 'getVideoFilePath').mockReturnValue(videoFilePath);
      (fs.existsSync as jest.Mock).mockReturnValue(false);
      (fs.mkdirSync as jest.Mock).mockImplementation(() => 'mocked-path');

      const result = service.getPaths(ytChannelId, ytVideoId);

      expect(mockFilePathService.getBasePath).toHaveBeenCalled();
      expect(service.getVideoFilePath).toHaveBeenCalledWith(
        ytChannelId,
        ytVideoId,
      );
      expect(fs.existsSync).toHaveBeenCalledWith(idFolderPath);
      expect(fs.existsSync).toHaveBeenCalledWith(screenshotsPath);
      expect(fs.mkdirSync).toHaveBeenCalledWith(idFolderPath, {
        recursive: true,
      });
      expect(fs.mkdirSync).toHaveBeenCalledWith(screenshotsPath, {
        recursive: true,
      });
      expect(result).toEqual({
        screenshotsPath,
        videoPath,
        videoFilePath,
      });
    });

    it('should not create directories when they already exist', () => {
      const ytChannelId = 'UC123456789';
      const ytVideoId = 'video123';
      const basePath = '/base/path';
      const videoFilePath = 'test-video.mp4';

      mockFilePathService.getBasePath.mockReturnValue(basePath);
      jest.spyOn(service, 'getVideoFilePath').mockReturnValue(videoFilePath);
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.mkdirSync as jest.Mock).mockImplementation(() => 'mocked-path');

      service.getPaths(ytChannelId, ytVideoId);

      expect(fs.existsSync).toHaveBeenCalled();
      expect(fs.mkdirSync).not.toHaveBeenCalled();
    });

    it('should handle path construction correctly', () => {
      const ytChannelId = 'UC987654321';
      const ytVideoId = 'video456';
      const basePath = '/custom/base/path';
      const videoFilePath = 'custom-video.mp4';

      mockFilePathService.getBasePath.mockReturnValue(basePath);
      jest.spyOn(service, 'getVideoFilePath').mockReturnValue(videoFilePath);
      (fs.existsSync as jest.Mock).mockReturnValue(false);
      (fs.mkdirSync as jest.Mock).mockImplementation(() => 'mocked-path');

      const result = service.getPaths(ytChannelId, ytVideoId);

      expect(result.videoFilePath).toBe(videoFilePath);
      expect(result.screenshotsPath).toContain('all_screenshots');
      expect(result.videoPath).toContain(videoFilePath);
    });
  });

  describe('processScreenshotsForUpload', () => {
    it('should process screenshots successfully', async () => {
      const ytChannelId = 'UC123456789';
      const ytVideoId = 'video123';
      const savedSeconds = [10, 20, 30];

      await service.processScreenshotsForUpload(
        ytChannelId,
        ytVideoId,
        savedSeconds,
      );
    });

    it('should handle empty saved seconds array', async () => {
      const ytChannelId = 'UC123456789';
      const ytVideoId = 'video123';
      const savedSeconds: number[] = [];

      await service.processScreenshotsForUpload(
        ytChannelId,
        ytVideoId,
        savedSeconds,
      );
    });
  });

  describe('getVideoFilePath', () => {
    it('should return video file path when video exists', () => {
      const ytChannelId = 'UC123456789';
      const ytVideoId = 'video123';
      const basePath = '/base/path';
      const dirPath = `${basePath}/${ytChannelId}/${ytVideoId}`;
      const mockFiles = ['video123.mp4', 'thumbnail.jpg', 'metadata.json'];

      mockFilePathService.getBasePath.mockReturnValue(basePath);
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.readdirSync as jest.Mock).mockReturnValue(mockFiles as any);

      const result = service.getVideoFilePath(ytChannelId, ytVideoId);

      expect(mockFilePathService.getBasePath).toHaveBeenCalled();
      expect(fs.existsSync).toHaveBeenCalledWith(dirPath);
      expect(fs.readdirSync).toHaveBeenCalledWith(dirPath);
      expect(result).toBe('video123.mp4');
    });

    it('should return null when directory does not exist', () => {
      const ytChannelId = 'UC123456789';
      const ytVideoId = 'video123';
      const basePath = '/base/path';
      const dirPath = `${basePath}/${ytChannelId}/${ytVideoId}`;

      mockFilePathService.getBasePath.mockReturnValue(basePath);
      (fs.existsSync as jest.Mock).mockReturnValue(false);

      const result = service.getVideoFilePath(ytChannelId, ytVideoId);

      expect(fs.existsSync).toHaveBeenCalledWith(dirPath);
      expect(result).toBeNull();
    });

    it('should return null when no video file found', () => {
      const ytChannelId = 'UC123456789';
      const ytVideoId = 'video123';
      const basePath = '/base/path';
      const dirPath = `${basePath}/${ytChannelId}/${ytVideoId}`;
      const mockFiles = ['thumbnail.jpg', 'metadata.json', 'screenshot.png'];

      mockFilePathService.getBasePath.mockReturnValue(basePath);
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.readdirSync as jest.Mock).mockReturnValue(mockFiles as any);

      const result = service.getVideoFilePath(ytChannelId, ytVideoId);

      expect(fs.existsSync).toHaveBeenCalledWith(dirPath);
      expect(fs.readdirSync).toHaveBeenCalledWith(dirPath);
      expect(result).toBeNull();
    });

    it('should find video files with different extensions', () => {
      const ytChannelId = 'UC123456789';
      const ytVideoId = 'video123';
      const basePath = '/base/path';
      const dirPath = `${basePath}/${ytChannelId}/${ytVideoId}`;
      const mockFiles = ['video123.mkv', 'thumbnail.jpg', 'metadata.json'];

      mockFilePathService.getBasePath.mockReturnValue(basePath);
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.readdirSync as jest.Mock).mockReturnValue(mockFiles as any);

      const result = service.getVideoFilePath(ytChannelId, ytVideoId);

      expect(mockFilePathService.getBasePath).toHaveBeenCalled();
      expect(fs.existsSync).toHaveBeenCalledWith(dirPath);
      expect(fs.readdirSync).toHaveBeenCalledWith(dirPath);
      expect(result).toBe('video123.mkv');
    });

    it('should find webm video files', () => {
      const ytChannelId = 'UC123456789';
      const ytVideoId = 'video123';
      const basePath = '/base/path';
      const dirPath = `${basePath}/${ytChannelId}/${ytVideoId}`;
      const mockFiles = ['video123.webm', 'thumbnail.jpg', 'metadata.json'];

      mockFilePathService.getBasePath.mockReturnValue(basePath);
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.readdirSync as jest.Mock).mockReturnValue(mockFiles as any);

      const result = service.getVideoFilePath(ytChannelId, ytVideoId);

      expect(mockFilePathService.getBasePath).toHaveBeenCalled();
      expect(fs.existsSync).toHaveBeenCalledWith(dirPath);
      expect(fs.readdirSync).toHaveBeenCalledWith(dirPath);
      expect(result).toBe('video123.webm');
    });

    it('should return null when readdirSync throws', () => {
      const ytChannelId = 'UC123456789';
      const ytVideoId = 'video123';
      const basePath = '/base/path';
      const dirPath = `${basePath}/${ytChannelId}/${ytVideoId}`;

      mockFilePathService.getBasePath.mockReturnValue(basePath);
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.readdirSync as jest.Mock).mockImplementation(() => {
        throw new Error('Permission denied');
      });

      const result = service.getVideoFilePath(ytChannelId, ytVideoId);

      expect(fs.existsSync).toHaveBeenCalledWith(dirPath);
      expect(fs.readdirSync).toHaveBeenCalledWith(dirPath);
      expect(result).toBeNull();
    });

    it('should handle case-insensitive file extensions', () => {
      const ytChannelId = 'UC123456789';
      const ytVideoId = 'video123';
      const basePath = '/base/path';
      const dirPath = `${basePath}/${ytChannelId}/${ytVideoId}`;
      const mockFiles = ['video123.MP4', 'thumbnail.jpg', 'metadata.json'];

      mockFilePathService.getBasePath.mockReturnValue(basePath);
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.readdirSync as jest.Mock).mockReturnValue(mockFiles as any);

      const result = service.getVideoFilePath(ytChannelId, ytVideoId);

      expect(mockFilePathService.getBasePath).toHaveBeenCalled();
      expect(fs.existsSync).toHaveBeenCalledWith(dirPath);
      expect(fs.readdirSync).toHaveBeenCalledWith(dirPath);
      expect(result).toBe('video123.MP4');
    });
  });
});
