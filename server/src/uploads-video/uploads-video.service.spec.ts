import { Test, TestingModule } from '@nestjs/testing';
import { UploadsVideoService } from './uploads-video.service';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { ThumbnailsManagerService } from 'src/thumbnails/manager/thumbnails-manager.service';
import { ScreenshotsManagerService } from 'src/screenshots/manager/screenshots-manager.service';
import { FilePathService } from 'src/file/file-path.service';
import { FileOperationService } from 'src/file/file-operation.service';
import { DirectoryService } from 'src/file/directory.service';
import { YoutubeService } from 'src/core/external-services/youtube-api/youtube.service';

describe('UploadsVideoService', () => {
  let service: UploadsVideoService;
  let prismaService: PrismaService;
  let thumbnailsManagerService: ThumbnailsManagerService;
  let screenshotsManagerService: ScreenshotsManagerService;
  let filePathService: FilePathService;
  let fileOperationService: FileOperationService;
  let directoryService: DirectoryService;
  let youtubeService: YoutubeService;

  const mockPrismaService = {
    channel: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    uploadsVideo: {
      update: jest.fn(),
      delete: jest.fn(),
      deleteMany: jest.fn(),
      createMany: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
    thumbnail: {
      findUnique: jest.fn(),
      delete: jest.fn(),
    },
    screenshot: {
      create: jest.fn(),
    },
  };

  const mockThumbnailsManagerService = {
    deleteThumbnail: jest.fn(),
  };

  const mockScreenshotsManagerService = {
    processScreenshotsForUpload: jest.fn(),
  };

  const mockFilePathService = {
    getBasePath: jest.fn(),
  };

  const mockFileOperationService = {
    listFiles: jest.fn(),
    fileExists: jest.fn(),
    deleteFile: jest.fn(),
  };

  const mockDirectoryService = {
    deleteVideoDirectory: jest.fn(),
    deleteDirSync: jest.fn(),
  };

  const mockYoutubeService = {
    getAllUploads: jest.fn(),
    syncUploads: jest.fn(),
  };

  beforeEach(async () => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UploadsVideoService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: ThumbnailsManagerService,
          useValue: mockThumbnailsManagerService,
        },
        {
          provide: ScreenshotsManagerService,
          useValue: mockScreenshotsManagerService,
        },
        {
          provide: FilePathService,
          useValue: mockFilePathService,
        },
        {
          provide: FileOperationService,
          useValue: mockFileOperationService,
        },
        {
          provide: DirectoryService,
          useValue: mockDirectoryService,
        },
        {
          provide: YoutubeService,
          useValue: mockYoutubeService,
        },
      ],
    }).compile();

    service = module.get<UploadsVideoService>(UploadsVideoService);
    prismaService = module.get<PrismaService>(PrismaService);
    thumbnailsManagerService = module.get<ThumbnailsManagerService>(
      ThumbnailsManagerService,
    );
    screenshotsManagerService = module.get<ScreenshotsManagerService>(
      ScreenshotsManagerService,
    );
    filePathService = module.get<FilePathService>(FilePathService);
    fileOperationService =
      module.get<FileOperationService>(FileOperationService);
    directoryService = module.get<DirectoryService>(DirectoryService);
    youtubeService = module.get<YoutubeService>(YoutubeService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('uploadsList', () => {
    it('should return channel with uploads list successfully', async () => {
      const ytChannelId = 'UC123456789';
      const sortOrder = 'desc' as const;
      const mockChannel = {
        id: 1,
        ytId: ytChannelId,
        title: 'Test Channel',
        uploads: [
          { id: 1, ytId: 'video1', title: 'Video 1', publishedAt: new Date() },
          { id: 2, ytId: 'video2', title: 'Video 2', publishedAt: new Date() },
        ],
      };

      mockPrismaService.channel.findUnique.mockResolvedValue(mockChannel);

      const result = await service.uploadsList(ytChannelId, sortOrder);

      expect(prismaService.channel.findUnique).toHaveBeenCalledWith({
        where: { ytId: ytChannelId },
        include: {
          uploads: {
            where: { status: 0 },
            orderBy: { publishedAt: sortOrder },
            take: 50,
          },
        },
      });
      expect(result).toEqual(mockChannel);
    });

    it('should return null when channel not found', async () => {
      const ytChannelId = 'UC999999999';
      const sortOrder = 'asc' as const;

      mockPrismaService.channel.findUnique.mockResolvedValue(null);

      const result = await service.uploadsList(ytChannelId, sortOrder);

      expect(prismaService.channel.findUnique).toHaveBeenCalledWith({
        where: { ytId: ytChannelId },
        include: {
          uploads: {
            where: { status: 0 },
            orderBy: { publishedAt: sortOrder },
            take: 50,
          },
        },
      });
      expect(result).toBeNull();
    });
  });

  describe('saveUpload', () => {
    it('should save uploads successfully', async () => {
      const saveDto = {
        uploads: [
          { ytVideoId: 'video1', ytChannelId: 'UC123456789' },
          { ytVideoId: 'video2', ytChannelId: 'UC123456789' },
        ],
      };

      const mockUploads = [
        { id: 1, ytId: 'video1', channelId: 1 },
        { id: 2, ytId: 'video2', channelId: 1 },
      ];

      const mockChannel = { id: 1, title: 'Test Channel' };

      mockPrismaService.uploadsVideo.update
        .mockResolvedValueOnce(mockUploads[0])
        .mockResolvedValueOnce(mockUploads[1]);
      mockPrismaService.channel.findUnique
        .mockResolvedValueOnce(mockChannel)
        .mockResolvedValueOnce(mockChannel);

      const result = await service.saveUpload(saveDto);

      expect(prismaService.uploadsVideo.update).toHaveBeenCalledTimes(2);
      expect(prismaService.uploadsVideo.update).toHaveBeenCalledWith({
        where: { ytId: 'video1' },
        data: { artifact: 'SAVED', status: 1 },
      });
      expect(prismaService.uploadsVideo.update).toHaveBeenCalledWith({
        where: { ytId: 'video2' },
        data: { artifact: 'SAVED', status: 1 },
      });
      expect(result).toEqual(mockUploads);
    });

    it('should handle empty uploads array', async () => {
      const saveDto = { uploads: [] };

      const result = await service.saveUpload(saveDto);

      expect(prismaService.uploadsVideo.update).not.toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('finishProcessingUpload', () => {
    const finishDto = {
      savedSeconds: [10, 20, 30],
      ytChannelId: 'UC123456789',
      ytVideoId: 'video123',
    };

    it('should finish processing upload with screenshots successfully', async () => {
      const mockUpload = { id: 1, ytId: 'video123', channelId: 1 };
      const mockThumbnail = { id: 1, uploadsVideoId: 1 };

      mockPrismaService.uploadsVideo.update.mockResolvedValue(mockUpload);
      mockPrismaService.thumbnail.findUnique.mockResolvedValue(mockThumbnail);
      mockPrismaService.thumbnail.delete.mockResolvedValue(mockThumbnail);
      mockScreenshotsManagerService.processScreenshotsForUpload.mockResolvedValue(
        undefined,
      );
      mockFilePathService.getBasePath.mockReturnValue('/base/path');
      mockFileOperationService.listFiles.mockResolvedValue(['video.mp4']);
      mockFileOperationService.fileExists.mockResolvedValue(true);
      mockFileOperationService.deleteFile.mockResolvedValue(undefined);
      mockThumbnailsManagerService.deleteThumbnail.mockResolvedValue(undefined);
      mockPrismaService.screenshot.create.mockResolvedValue({ id: 1 });

      const result = await service.finishProcessingUpload(finishDto);

      expect(prismaService.uploadsVideo.update).toHaveBeenCalledWith({
        where: { ytId: 'video123' },
        data: { status: 2, artifact: 'SCREENSHOT' },
      });
      expect(prismaService.thumbnail.findUnique).toHaveBeenCalledWith({
        where: { uploadsVideoId: 1 },
      });
      expect(prismaService.thumbnail.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(
        screenshotsManagerService.processScreenshotsForUpload,
      ).toHaveBeenCalledWith('UC123456789', 'video123', [10, 20, 30]);
      expect(thumbnailsManagerService.deleteThumbnail).toHaveBeenCalledWith(
        'UC123456789',
        'video123',
      );
      expect(prismaService.screenshot.create).toHaveBeenCalledTimes(3);
      expect(result).toEqual(mockUpload);
    });

    it('should handle upload with no saved seconds', async () => {
      const finishDtoNoSeconds = {
        savedSeconds: [],
        ytChannelId: 'UC123456789',
        ytVideoId: 'video123',
      };

      const mockUpload = { id: 1, ytId: 'video123', channelId: 1 };

      mockPrismaService.uploadsVideo.update.mockResolvedValue(mockUpload);
      mockPrismaService.thumbnail.findUnique.mockResolvedValue(null);
      mockDirectoryService.deleteVideoDirectory.mockResolvedValue(undefined);
      mockPrismaService.uploadsVideo.delete.mockResolvedValue(mockUpload);

      const result = await service.finishProcessingUpload(finishDtoNoSeconds);

      expect(prismaService.uploadsVideo.update).toHaveBeenCalledWith({
        where: { ytId: 'video123' },
        data: { status: 2, artifact: 'SCREENSHOT' },
      });
      expect(directoryService.deleteVideoDirectory).toHaveBeenCalledWith(
        'UC123456789',
        'video123',
      );
      expect(prismaService.uploadsVideo.delete).toHaveBeenCalledWith({
        where: { ytId: 'video123' },
      });
      expect(result).toEqual(mockUpload);
    });

    it('should handle thumbnail deletion error gracefully', async () => {
      const mockUpload = { id: 1, ytId: 'video123', channelId: 1 };
      const mockThumbnail = { id: 1, uploadsVideoId: 1 };

      mockPrismaService.uploadsVideo.update.mockResolvedValue(mockUpload);
      mockPrismaService.thumbnail.findUnique.mockResolvedValue(mockThumbnail);
      mockPrismaService.thumbnail.delete.mockRejectedValue(
        new Error('Delete failed'),
      );
      mockScreenshotsManagerService.processScreenshotsForUpload.mockResolvedValue(
        undefined,
      );
      mockDirectoryService.deleteVideoDirectory.mockResolvedValue(undefined);
      mockThumbnailsManagerService.deleteThumbnail.mockResolvedValue(undefined);
      mockPrismaService.screenshot.create.mockResolvedValue({ id: 1 });

      const result = await service.finishProcessingUpload(finishDto);

      expect(console.error).toHaveBeenCalledWith(
        'Error deleting thumbnail:',
        expect.any(Error),
      );
      expect(result).toEqual(mockUpload);
    });
  });

  describe('deleteUploads', () => {
    it('should delete specific uploads successfully', async () => {
      const deleteDto = {
        ytChannelId: 'UC123456789',
        ytVideoIds: ['video1', 'video2'],
      };

      mockPrismaService.uploadsVideo.delete.mockResolvedValue({ id: 1 });
      mockDirectoryService.deleteDirSync.mockResolvedValue(undefined);

      const result = await service.deleteUploads(deleteDto);

      expect(prismaService.uploadsVideo.delete).toHaveBeenCalledTimes(2);
      expect(prismaService.uploadsVideo.delete).toHaveBeenCalledWith({
        where: { ytId: 'video1' },
      });
      expect(prismaService.uploadsVideo.delete).toHaveBeenCalledWith({
        where: { ytId: 'video2' },
      });
      expect(directoryService.deleteDirSync).toHaveBeenCalledTimes(2);
      expect(result).toEqual({ success: true });
    });

    it('should delete all saved/downloaded uploads when no specific IDs provided', async () => {
      const deleteDto = {
        ytChannelId: 'UC123456789',
        ytVideoIds: [],
      };

      const mockChannel = {
        id: 1,
        uploads: [
          { ytId: 'video1', id: 1 },
          { ytId: 'video2', id: 2 },
        ],
      };

      mockPrismaService.channel.findUnique.mockResolvedValue(mockChannel);
      mockPrismaService.uploadsVideo.deleteMany.mockResolvedValue({ count: 2 });

      const result = await service.deleteUploads(deleteDto);

      expect(prismaService.channel.findUnique).toHaveBeenCalledWith({
        where: { ytId: 'UC123456789' },
        select: {
          id: true,
          uploads: {
            where: { status: 1, artifact: { in: ['SAVED', 'DOWNLOADED'] } },
            select: { ytId: true, id: true },
          },
        },
      });
      expect(prismaService.uploadsVideo.deleteMany).toHaveBeenCalledWith({
        where: {
          channelId: 1,
          ytId: { in: ['video1', 'video2'] },
        },
      });
      expect(result).toEqual({ success: true });
    });

    it('should handle channel not found when deleting all uploads', async () => {
      const deleteDto = {
        ytChannelId: 'UC999999999',
        ytVideoIds: [],
      };

      mockPrismaService.channel.findUnique.mockResolvedValue(null);

      const result = await service.deleteUploads(deleteDto);

      expect(prismaService.channel.findUnique).toHaveBeenCalledWith({
        where: { ytId: 'UC999999999' },
        select: {
          id: true,
          uploads: {
            where: { status: 1, artifact: { in: ['SAVED', 'DOWNLOADED'] } },
            select: { ytId: true, id: true },
          },
        },
      });
      expect(prismaService.uploadsVideo.deleteMany).not.toHaveBeenCalled();
      expect(result).toEqual({ success: true });
    });
  });

  describe('fetchUploads', () => {
    it('should fetch uploads successfully', async () => {
      const fetchDto = { ytChannelId: 'UC123456789' };
      const mockChannel = {
        id: 1,
        title: 'Test Channel',
        fetchedUntilEnd: false,
      };
      const mockUploads = [
        { ytId: 'video1', title: 'Video 1' },
        { ytId: 'video2', title: 'Video 2' },
      ];

      mockPrismaService.channel.findUnique.mockResolvedValue(mockChannel);
      mockYoutubeService.getAllUploads.mockResolvedValue(mockUploads);
      mockPrismaService.channel.update.mockResolvedValue(mockChannel);
      mockPrismaService.uploadsVideo.createMany.mockResolvedValue({ count: 2 });

      const result = await service.fetchUploads(fetchDto);

      expect(prismaService.channel.findUnique).toHaveBeenCalledWith({
        where: { ytId: 'UC123456789' },
        select: {
          uploads: {
            orderBy: { publishedAt: 'asc' },
            take: 1,
            select: { nextPageToken: true },
          },
          fetchedUntilEnd: true,
          id: true,
          title: true,
        },
      });
      expect(youtubeService.fetchUploadsForChannel).toHaveBeenCalledWith(
        'UC123456789',
        1,
      );
      expect(prismaService.channel.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { fetchedUntilEnd: true },
      });
      expect(prismaService.uploadsVideo.createMany).toHaveBeenCalledWith({
        data: mockUploads,
      });
      expect(result).toEqual({ count: 2 });
    });

    it('should throw error when channel not found', async () => {
      const fetchDto = { ytChannelId: 'UC999999999' };

      mockPrismaService.channel.findUnique.mockResolvedValue(null);

      await expect(service.fetchUploads(fetchDto)).rejects.toThrow(
        'Channel not found',
      );
    });

    it('should throw error when already fetched until end', async () => {
      const fetchDto = { ytChannelId: 'UC123456789' };
      const mockChannel = {
        id: 1,
        title: 'Test Channel',
        fetchedUntilEnd: true,
      };

      mockPrismaService.channel.findUnique.mockResolvedValue(mockChannel);

      await expect(service.fetchUploads(fetchDto)).rejects.toThrow(
        'we are done. no more uploads to fetch',
      );
    });
  });

  describe('syncUploads', () => {
    it('should sync uploads successfully', async () => {
      const syncDto = { channelId: 1, ytChannelId: 'UC123456789' };
      const mockChannel = { id: 1, title: 'Test Channel' };
      const mockLatestSaved = {
        ytId: 'video1',
        publishedAt: new Date('2023-01-01'),
      };
      const mockLatestFetched = {
        ytId: 'video2',
        publishedAt: new Date('2023-01-02'),
      };
      const mockSyncedUploads = [
        { ytId: 'video3', title: 'Video 3' },
        { ytId: 'video4', title: 'Video 4' },
      ];
      const mockExistingUploads = [{ ytId: 'video3' }];

      mockPrismaService.channel.findUnique.mockResolvedValue(mockChannel);
      mockPrismaService.uploadsVideo.findMany
        .mockResolvedValueOnce([mockLatestSaved])
        .mockResolvedValueOnce(mockExistingUploads);
      mockPrismaService.uploadsVideo.findUnique.mockResolvedValue(
        mockLatestFetched,
      );
      mockYoutubeService.syncUploads.mockResolvedValue(mockSyncedUploads);
      mockPrismaService.channel.update.mockResolvedValue(mockChannel);
      mockPrismaService.uploadsVideo.createMany.mockResolvedValue({ count: 1 });

      const result = await service.syncUploads(syncDto);

      expect(youtubeService.syncUploads).toHaveBeenCalledWith(
        'UC123456789',
        'video2',
        1,
      );
      expect(prismaService.uploadsVideo.createMany).toHaveBeenCalledWith({
        data: [{ ytId: 'video4', title: 'Video 4' }],
      });
      expect(result).toEqual({ count: 1 });
    });

    it('should handle no uploads to sync', async () => {
      const syncDto = { channelId: 1, ytChannelId: 'UC123456789' };
      const mockChannel = { id: 1, title: 'Test Channel' };

      mockPrismaService.channel.findUnique.mockResolvedValue(mockChannel);
      mockPrismaService.uploadsVideo.findMany.mockResolvedValue([]);
      mockPrismaService.uploadsVideo.findUnique.mockResolvedValue(null);
      mockYoutubeService.syncUploads.mockResolvedValue([]);

      const result = await service.syncUploads(syncDto);

      expect(result).toEqual({ count: 0 });
    });

    it('should throw error when channel not found', async () => {
      const syncDto = { channelId: 1, ytChannelId: 'UC999999999' };

      mockPrismaService.channel.findUnique.mockResolvedValue(null);

      await expect(service.syncUploads(syncDto)).rejects.toThrow(
        'Channel not found',
      );
    });
  });

  describe('savedUploads', () => {
    it('should return saved uploads for multiple channels', async () => {
      const savedDto = { ytChannelIds: ['UC123456789', 'UC987654321'] };
      const mockChannel1 = {
        id: 1,
        title: 'Channel 1',
        src: 'https://example.com/1',
        ytId: 'UC123456789',
        uploads: [
          {
            id: 1,
            ytId: 'video1',
            title: 'Video 1',
            status: 1,
            artifact: 'SAVED',
          },
        ],
      };
      const mockChannel2 = {
        id: 2,
        title: 'Channel 2',
        src: 'https://example.com/2',
        ytId: 'UC987654321',
        uploads: [
          {
            id: 2,
            ytId: 'video2',
            title: 'Video 2',
            status: 1,
            artifact: 'DOWNLOADED',
          },
        ],
      };

      mockPrismaService.channel.findUnique
        .mockResolvedValueOnce(mockChannel1)
        .mockResolvedValueOnce(mockChannel2);

      const result = await service.savedUploads(savedDto);

      expect(prismaService.channel.findUnique).toHaveBeenCalledTimes(2);
      expect(result).toEqual([
        {
          ytChannelId: 'UC123456789',
          channel: mockChannel1,
          uploads: mockChannel1.uploads,
          totalUploads: 1,
        },
        {
          ytChannelId: 'UC987654321',
          channel: mockChannel2,
          uploads: mockChannel2.uploads,
          totalUploads: 1,
        },
      ]);
    });

    it('should handle channel not found', async () => {
      const savedDto = { ytChannelIds: ['UC999999999'] };

      mockPrismaService.channel.findUnique.mockResolvedValue(null);

      const result = await service.savedUploads(savedDto);

      expect(result).toEqual([
        {
          ytChannelId: 'UC999999999',
          channel: null,
          uploads: [],
          totalUploads: 0,
        },
      ]);
    });

    it('should handle empty channel IDs array', async () => {
      const savedDto = { ytChannelIds: [] };

      const result = await service.savedUploads(savedDto);

      expect(prismaService.channel.findUnique).not.toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('deleteDownloadedVideo', () => {
    it('should delete video files successfully', async () => {
      const params = { ytChannelId: 'UC123456789', ytVideoId: 'video123' };
      const mockFiles = ['video.mp4', 'thumbnail.jpg', 'metadata.json'];
      const mockBasePath = '/base/path';

      mockFilePathService.getBasePath.mockReturnValue(mockBasePath);
      mockFileOperationService.listFiles.mockResolvedValue(mockFiles);
      mockFileOperationService.fileExists.mockResolvedValue(true);
      mockFileOperationService.deleteFile.mockResolvedValue(undefined);

      await service['deleteDownloadedVideo'](params);

      expect(filePathService.getBasePath).toHaveBeenCalled();
      expect(fileOperationService.listFiles).toHaveBeenCalledWith(
        '/base/path/UC123456789/video123',
      );
      expect(fileOperationService.deleteFile).toHaveBeenCalledWith(
        '/base/path/UC123456789/video123/video.mp4',
      );
    });

    it('should handle file operation errors gracefully', async () => {
      const params = { ytChannelId: 'UC123456789', ytVideoId: 'video123' };

      mockFilePathService.getBasePath.mockReturnValue('/base/path');
      mockFileOperationService.listFiles.mockRejectedValue(
        new Error('File system error'),
      );

      await service['deleteDownloadedVideo'](params);

      expect(console.error).toHaveBeenCalledWith(
        'Error deleting video:',
        expect.any(Error),
      );
    });
  });
});
