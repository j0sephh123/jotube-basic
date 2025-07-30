import { Test, TestingModule } from '@nestjs/testing';
import { ThumbnailsApiService } from './thumbnails-api.service';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { ThumbnailsManagerService } from 'src/thumbnails/manager/thumbnails-manager.service';

describe('ThumbnailsApiService', () => {
  let service: ThumbnailsApiService;
  let prismaService: PrismaService;
  let thumbnailsManagerService: ThumbnailsManagerService;

  const mockPrismaService = {
    $queryRaw: jest.fn(),
    uploadsVideo: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
    },
    thumbnail: {
      findFirst: jest.fn(),
    },
    screenshot: {
      findMany: jest.fn(),
    },
  };

  const mockThumbnailsManagerService = {
    countThumbnails: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ThumbnailsApiService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: ThumbnailsManagerService,
          useValue: mockThumbnailsManagerService,
        },
      ],
    }).compile();

    service = module.get<ThumbnailsApiService>(ThumbnailsApiService);
    prismaService = module.get<PrismaService>(PrismaService);
    thumbnailsManagerService = module.get<ThumbnailsManagerService>(
      ThumbnailsManagerService,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getSlides', () => {
    it('should return slides for specific channel IDs', async () => {
      const mockScreenshots = [
        {
          id: 1,
          second: 10,
          ytChannelId: 'channel1',
          ytVideoId: 'video1',
          isFav: false,
        },
        {
          id: 2,
          second: 20,
          ytChannelId: 'channel1',
          ytVideoId: 'video2',
          isFav: true,
        },
      ];

      mockPrismaService.$queryRaw.mockResolvedValue(mockScreenshots);

      const result = await service.getSlides(['channel1']);

      expect(prismaService.$queryRaw).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.stringContaining('WHERE ytChannelId ='),
        ]),
        'channel1',
      );
      expect(result).toEqual([
        {
          ytVideoId: 'video1',
          id: 1,
          second: 10,
          src: 'http://localhost:3003/images/channel1/video1/saved_screenshots/video1-10.png',
          isFav: false,
        },
        {
          ytVideoId: 'video2',
          id: 2,
          second: 20,
          src: 'http://localhost:3003/images/channel1/video2/saved_screenshots/video2-20.png',
          isFav: true,
        },
      ]);
    });

    it('should return slides for all channels when no channel IDs provided', async () => {
      const mockScreenshots = [
        {
          id: 1,
          second: 10,
          ytChannelId: 'channel1',
          ytVideoId: 'video1',
          isFav: false,
        },
      ];

      mockPrismaService.$queryRaw.mockResolvedValue(mockScreenshots);

      const result = await service.getSlides([]);

      expect(prismaService.$queryRaw).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.stringContaining('SELECT * FROM Screenshot'),
        ]),
      );
      expect(result).toEqual([
        {
          ytVideoId: 'video1',
          id: 1,
          second: 10,
          src: 'http://localhost:3003/images/channel1/video1/saved_screenshots/video1-10.png',
          isFav: false,
        },
      ]);
    });

    it('should handle multiple channel IDs', async () => {
      const mockScreenshots1 = [
        {
          id: 1,
          second: 10,
          ytChannelId: 'channel1',
          ytVideoId: 'video1',
          isFav: false,
        },
      ];

      const mockScreenshots2 = [
        {
          id: 2,
          second: 20,
          ytChannelId: 'channel2',
          ytVideoId: 'video2',
          isFav: true,
        },
      ];

      mockPrismaService.$queryRaw
        .mockResolvedValueOnce(mockScreenshots1)
        .mockResolvedValueOnce(mockScreenshots2);

      const result = await service.getSlides(['channel1', 'channel2']);

      expect(prismaService.$queryRaw).toHaveBeenCalledTimes(2);
      expect(result).toHaveLength(2);
    });
  });

  describe('groupedThumbnails', () => {
    it('should return grouped thumbnail channels with upload counts', async () => {
      const mockResult = [
        {
          artifact: 'THUMBNAIL',
          channel: {
            id: 1,
            ytId: 'channel1',
            title: 'Channel 1',
            src: 'src1',
          },
        },
        {
          artifact: 'THUMBNAIL',
          channel: {
            id: 1,
            ytId: 'channel1',
            title: 'Channel 1',
            src: 'src1',
          },
        },
        {
          artifact: 'THUMBNAIL',
          channel: {
            id: 2,
            ytId: 'channel2',
            title: 'Channel 2',
            src: 'src2',
          },
        },
      ];

      mockPrismaService.uploadsVideo.findMany.mockResolvedValue(mockResult);

      const result = await service.groupedThumbnails();

      expect(prismaService.uploadsVideo.findMany).toHaveBeenCalledWith({
        where: { artifact: { in: ['THUMBNAIL'] } },
        select: {
          artifact: true,
          channel: {
            select: {
              id: true,
              ytId: true,
              title: true,
              src: true,
            },
          },
        },
      });

      expect(result.thumbnailChannels).toEqual([
        {
          id: 1,
          ytId: 'channel1',
          title: 'Channel 1',
          src: 'src1',
          uploadsCount: 2,
        },
        {
          id: 2,
          ytId: 'channel2',
          title: 'Channel 2',
          src: 'src2',
          uploadsCount: 1,
        },
      ]);

      expect(result.thumbnailChannelIds).toEqual([1, 2]);
    });
  });

  describe('uploadsWithThumbnails', () => {
    it('should return uploads with thumbnails for given channel IDs', async () => {
      const mockResp = [
        {
          ytId: 'video1',
          channel: { ytId: 'channel1' },
        },
        {
          ytId: 'video2',
          channel: { ytId: 'channel2' },
        },
      ];

      mockPrismaService.uploadsVideo.findMany.mockResolvedValue(mockResp);

      const result = await service.uploadsWithThumbnails([1, 2]);

      expect(prismaService.uploadsVideo.findMany).toHaveBeenCalledWith({
        where: { channelId: { in: [1, 2] }, artifact: 'THUMBNAIL' },
        select: {
          ytId: true,
          channel: {
            select: { ytId: true },
          },
        },
      });

      expect(result).toEqual([
        { ytChannelId: 'channel1', ytVideoId: 'video1' },
        { ytChannelId: 'channel2', ytVideoId: 'video2' },
      ]);
    });
  });

  describe('thumbnailByUpload', () => {
    it('should return thumbnail info for existing upload', async () => {
      const mockVideo = {
        ytId: 'video1',
        channel: { ytId: 'channel1' },
      };

      mockPrismaService.uploadsVideo.findFirst.mockResolvedValue(mockVideo);

      const result = await service.thumbnailByUpload('video1');

      expect(prismaService.uploadsVideo.findFirst).toHaveBeenCalledWith({
        where: { ytId: 'video1', artifact: 'THUMBNAIL' },
        select: {
          ytId: true,
          channel: {
            select: { ytId: true },
          },
        },
      });

      expect(result).toEqual({
        ytChannelId: 'channel1',
        ytVideoId: 'video1',
      });
    });

    it('should return null for non-existing upload', async () => {
      mockPrismaService.uploadsVideo.findFirst.mockResolvedValue(null);

      const result = await service.thumbnailByUpload('nonexistent');

      expect(result).toBeNull();
    });
  });

  describe('thumbnails', () => {
    it('should return thumbnails with default sorting', async () => {
      const mockUploads = [
        {
          id: 1,
          ytId: 'video1',
          title: 'Video 1',
          publishedAt: new Date('2023-01-01'),
          channel: {
            id: 1,
            ytId: 'channel1',
            title: 'Channel 1',
          },
          thumbnail: {
            createdAt: new Date('2023-01-01'),
            id: 1,
            perRow: 5,
            totalSeconds: 100,
          },
        },
      ];

      mockPrismaService.uploadsVideo.findMany.mockResolvedValue(mockUploads);

      const result = await service.thumbnails({});

      expect(prismaService.uploadsVideo.findMany).toHaveBeenCalledWith({
        where: { artifact: 'THUMBNAIL' },
        select: {
          id: true,
          ytId: true,
          title: true,
          publishedAt: true,
          channel: {
            select: {
              id: true,
              ytId: true,
              title: true,
            },
          },
          thumbnail: {
            select: {
              createdAt: true,
              id: true,
              perRow: true,
              totalSeconds: true,
            },
          },
        },
        orderBy: { publishedAt: 'desc' },
      });

      expect(result).toEqual(mockUploads);
    });

    it('should return thumbnails with custom sorting by totalSeconds', async () => {
      const mockUploads = [
        {
          id: 1,
          ytId: 'video1',
          title: 'Video 1',
          publishedAt: new Date('2023-01-01'),
          channel: {
            id: 1,
            ytId: 'channel1',
            title: 'Channel 1',
          },
          thumbnail: {
            createdAt: new Date('2023-01-01'),
            id: 1,
            perRow: 5,
            totalSeconds: 100,
          },
        },
      ];

      mockPrismaService.uploadsVideo.findMany.mockResolvedValue(mockUploads);

      const result = await service.thumbnails({
        order: 'asc',
        filterField: 'totalSeconds',
      });

      expect(prismaService.uploadsVideo.findMany).toHaveBeenCalledWith({
        where: { artifact: 'THUMBNAIL' },
        select: {
          id: true,
          ytId: true,
          title: true,
          publishedAt: true,
          channel: {
            select: {
              id: true,
              ytId: true,
              title: true,
            },
          },
          thumbnail: {
            select: {
              createdAt: true,
              id: true,
              perRow: true,
              totalSeconds: true,
            },
          },
        },
        orderBy: { thumbnail: { totalSeconds: 'asc' } },
      });

      expect(result).toEqual(mockUploads);
    });
  });

  describe('getByYtVideoId', () => {
    it('should return thumbnail with thumbnails count for existing video', async () => {
      const mockThumbnail = {
        id: 1,
        perRow: 5,
        totalSeconds: 100,
        uploadsVideo: {
          ytId: 'video1',
          channel: {
            ytId: 'channel1',
          },
        },
      };

      mockPrismaService.thumbnail.findFirst.mockResolvedValue(mockThumbnail);
      mockThumbnailsManagerService.countThumbnails.mockResolvedValue(10);

      const result = await service.getByYtVideoId('video1');

      expect(prismaService.thumbnail.findFirst).toHaveBeenCalledWith({
        where: { uploadsVideo: { ytId: 'video1' } },
        include: {
          uploadsVideo: {
            include: {
              channel: true,
            },
          },
        },
      });

      expect(thumbnailsManagerService.countThumbnails).toHaveBeenCalledWith(
        'channel1',
        'video1',
      );

      expect(result).toEqual({
        ...mockThumbnail,
        thumbnailsCount: 9,
      });
    });

    it('should return null when thumbnail not found', async () => {
      mockPrismaService.thumbnail.findFirst.mockResolvedValue(null);

      const result = await service.getByYtVideoId('nonexistent');

      expect(result).toBeNull();
    });

    it('should return null when uploadsVideo is missing', async () => {
      const mockThumbnail = {
        id: 1,
        perRow: 5,
        totalSeconds: 100,
        uploadsVideo: null,
      };

      mockPrismaService.thumbnail.findFirst.mockResolvedValue(mockThumbnail);

      const result = await service.getByYtVideoId('video1');

      expect(result).toBeNull();
    });

    it('should return null when channel is missing', async () => {
      const mockThumbnail = {
        id: 1,
        perRow: 5,
        totalSeconds: 100,
        uploadsVideo: {
          ytId: 'video1',
          channel: null,
        },
      };

      mockPrismaService.thumbnail.findFirst.mockResolvedValue(mockThumbnail);

      const result = await service.getByYtVideoId('video1');

      expect(result).toBeNull();
    });
  });

  describe('getChannelScreenshots', () => {
    it('should return channel screenshots mapped to slides', async () => {
      const mockScreenshots = [
        {
          id: 1,
          second: 10,
          ytChannelId: 'channel1',
          ytVideoId: 'video1',
          isFav: false,
        },
        {
          id: 2,
          second: 20,
          ytChannelId: 'channel1',
          ytVideoId: 'video2',
          isFav: true,
        },
      ];

      mockPrismaService.screenshot.findMany.mockResolvedValue(mockScreenshots);

      const result = await service.getChannelScreenshots('channel1');

      expect(prismaService.screenshot.findMany).toHaveBeenCalledWith({
        where: { ytChannelId: 'channel1' },
        orderBy: [{ ytVideoId: 'asc' }, { second: 'asc' }],
        select: {
          id: true,
          second: true,
          ytChannelId: true,
          ytVideoId: true,
          isFav: true,
        },
      });

      expect(result).toEqual([
        {
          ytVideoId: 'video1',
          id: 1,
          second: 10,
          src: 'http://localhost:3003/images/channel1/video1/saved_screenshots/video1-10.png',
          isFav: false,
        },
        {
          ytVideoId: 'video2',
          id: 2,
          second: 20,
          src: 'http://localhost:3003/images/channel1/video2/saved_screenshots/video2-20.png',
          isFav: true,
        },
      ]);
    });
  });
});
