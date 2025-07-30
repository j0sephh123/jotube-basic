import { Test, TestingModule } from '@nestjs/testing';
import { ThumbnailsManagerService } from './thumbnails-manager.service';
import { FilePathService } from 'src/file/file-path.service';
import { FileOperationService } from 'src/file/file-operation.service';

describe('ThumbnailsManagerService', () => {
  let service: ThumbnailsManagerService;
  let filePathService: FilePathService;
  let fileOperationService: FileOperationService;

  const mockFilePathService = {
    getBasePath: jest.fn(),
  };

  const mockFileOperationService = {
    fileExistsSafe: jest.fn(),
    deleteDirectory: jest.fn(),
    listFiles: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ThumbnailsManagerService,
        {
          provide: FilePathService,
          useValue: mockFilePathService,
        },
        {
          provide: FileOperationService,
          useValue: mockFileOperationService,
        },
      ],
    }).compile();

    service = module.get<ThumbnailsManagerService>(ThumbnailsManagerService);
    filePathService = module.get<FilePathService>(FilePathService);
    fileOperationService =
      module.get<FileOperationService>(FileOperationService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('deleteThumbnail', () => {
    it('should delete thumbnail directory when it exists', async () => {
      const channel = 'testChannel';
      const video = 'testVideo';
      const basePath = '/base/path';
      const expectedThumbnailsFolder = `${basePath}/${channel}/${video}/thumbnails`;

      mockFilePathService.getBasePath.mockReturnValue(basePath);
      mockFileOperationService.fileExistsSafe.mockResolvedValue(true);
      mockFileOperationService.deleteDirectory.mockResolvedValue(undefined);

      await service.deleteThumbnail(channel, video);

      expect(filePathService.getBasePath).toHaveBeenCalledTimes(1);
      expect(fileOperationService.fileExistsSafe).toHaveBeenCalledWith(
        expectedThumbnailsFolder,
      );
      expect(fileOperationService.deleteDirectory).toHaveBeenCalledWith(
        expectedThumbnailsFolder,
      );
    });

    it('should not delete thumbnail directory when it does not exist', async () => {
      const channel = 'testChannel';
      const video = 'testVideo';
      const basePath = '/base/path';
      const expectedThumbnailsFolder = `${basePath}/${channel}/${video}/thumbnails`;

      mockFilePathService.getBasePath.mockReturnValue(basePath);
      mockFileOperationService.fileExistsSafe.mockResolvedValue(false);

      await service.deleteThumbnail(channel, video);

      expect(filePathService.getBasePath).toHaveBeenCalledTimes(1);
      expect(fileOperationService.fileExistsSafe).toHaveBeenCalledWith(
        expectedThumbnailsFolder,
      );
      expect(fileOperationService.deleteDirectory).not.toHaveBeenCalled();
    });

    it('should handle different channel and video names', async () => {
      const channel = 'anotherChannel';
      const video = 'anotherVideo';
      const basePath = '/different/path';
      const expectedThumbnailsFolder = `${basePath}/${channel}/${video}/thumbnails`;

      mockFilePathService.getBasePath.mockReturnValue(basePath);
      mockFileOperationService.fileExistsSafe.mockResolvedValue(true);
      mockFileOperationService.deleteDirectory.mockResolvedValue(undefined);

      await service.deleteThumbnail(channel, video);

      expect(filePathService.getBasePath).toHaveBeenCalledTimes(1);
      expect(fileOperationService.fileExistsSafe).toHaveBeenCalledWith(
        expectedThumbnailsFolder,
      );
      expect(fileOperationService.deleteDirectory).toHaveBeenCalledWith(
        expectedThumbnailsFolder,
      );
    });
  });

  describe('countThumbnails', () => {
    it('should return number of files when thumbnails folder exists', async () => {
      const channel = 'testChannel';
      const video = 'testVideo';
      const basePath = '/base/path';
      const expectedThumbnailsFolder = `${basePath}/${channel}/${video}/thumbnails`;
      const mockFiles = ['file1.png', 'file2.png', 'file3.jpg'];

      mockFilePathService.getBasePath.mockReturnValue(basePath);
      mockFileOperationService.fileExistsSafe.mockResolvedValue(true);
      mockFileOperationService.listFiles.mockResolvedValue(mockFiles);

      const result = await service.countThumbnails(channel, video);

      expect(filePathService.getBasePath).toHaveBeenCalledTimes(1);
      expect(fileOperationService.fileExistsSafe).toHaveBeenCalledWith(
        expectedThumbnailsFolder,
      );
      expect(fileOperationService.listFiles).toHaveBeenCalledWith(
        expectedThumbnailsFolder,
      );
      expect(result).toBe(3);
    });

    it('should return undefined when thumbnails folder does not exist', async () => {
      const channel = 'testChannel';
      const video = 'testVideo';
      const basePath = '/base/path';
      const expectedThumbnailsFolder = `${basePath}/${channel}/${video}/thumbnails`;

      mockFilePathService.getBasePath.mockReturnValue(basePath);
      mockFileOperationService.fileExistsSafe.mockResolvedValue(false);

      const result = await service.countThumbnails(channel, video);

      expect(filePathService.getBasePath).toHaveBeenCalledTimes(1);
      expect(fileOperationService.fileExistsSafe).toHaveBeenCalledWith(
        expectedThumbnailsFolder,
      );
      expect(fileOperationService.listFiles).not.toHaveBeenCalled();
      expect(result).toBeUndefined();
    });

    it('should return 0 when thumbnails folder exists but is empty', async () => {
      const channel = 'testChannel';
      const video = 'testVideo';
      const basePath = '/base/path';
      const expectedThumbnailsFolder = `${basePath}/${channel}/${video}/thumbnails`;

      mockFilePathService.getBasePath.mockReturnValue(basePath);
      mockFileOperationService.fileExistsSafe.mockResolvedValue(true);
      mockFileOperationService.listFiles.mockResolvedValue([]);

      const result = await service.countThumbnails(channel, video);

      expect(filePathService.getBasePath).toHaveBeenCalledTimes(1);
      expect(fileOperationService.fileExistsSafe).toHaveBeenCalledWith(
        expectedThumbnailsFolder,
      );
      expect(fileOperationService.listFiles).toHaveBeenCalledWith(
        expectedThumbnailsFolder,
      );
      expect(result).toBe(0);
    });

    it('should handle different channel and video names for counting', async () => {
      const channel = 'anotherChannel';
      const video = 'anotherVideo';
      const basePath = '/different/path';
      const expectedThumbnailsFolder = `${basePath}/${channel}/${video}/thumbnails`;
      const mockFiles = ['thumbnail1.png'];

      mockFilePathService.getBasePath.mockReturnValue(basePath);
      mockFileOperationService.fileExistsSafe.mockResolvedValue(true);
      mockFileOperationService.listFiles.mockResolvedValue(mockFiles);

      const result = await service.countThumbnails(channel, video);

      expect(filePathService.getBasePath).toHaveBeenCalledTimes(1);
      expect(fileOperationService.fileExistsSafe).toHaveBeenCalledWith(
        expectedThumbnailsFolder,
      );
      expect(fileOperationService.listFiles).toHaveBeenCalledWith(
        expectedThumbnailsFolder,
      );
      expect(result).toBe(1);
    });
  });
});
