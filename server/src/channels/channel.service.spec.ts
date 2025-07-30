import { Test, TestingModule } from '@nestjs/testing';
import { ChannelService } from './channel.service';
import { YoutubeService } from 'src/core/external-services/youtube-api/youtube.service';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { ArtifactType } from '@prisma/client';

describe('ChannelService', () => {
  let service: ChannelService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    channel: {
      delete: jest.fn(),
      create: jest.fn(),
      findUnique: jest.fn(),
    },
    uploadsVideo: {
      count: jest.fn(),
    },
    screenshot: {
      count: jest.fn(),
    },
  };

  const mockYoutubeService = {
    getChannelIdByVideoId: jest.fn(),
    getChannel: jest.fn(),
    getLatestUploadId: jest.fn(),
  };

  beforeEach(async () => {
    jest.spyOn(console, 'log').mockImplementation(() => {});

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChannelService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: YoutubeService,
          useValue: mockYoutubeService,
        },
      ],
    }).compile();

    service = module.get<ChannelService>(ChannelService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('delete', () => {
    it('should delete a channel successfully', async () => {
      const channelId = 1;
      const mockDeleteResult = { id: channelId, title: 'Test Channel' };

      mockPrismaService.channel.delete.mockResolvedValue(mockDeleteResult);

      const result = await service.delete(channelId);

      expect(prismaService.channel.delete).toHaveBeenCalledWith({
        where: { id: channelId },
      });
      expect(result).toEqual({ success: true });
    });

    it('should throw an error when channel deletion fails', async () => {
      const channelId = 999;
      const mockError = new Error('Channel not found');

      mockPrismaService.channel.delete.mockRejectedValue(mockError);

      await expect(service.delete(channelId)).rejects.toThrow(
        'Channel not found',
      );

      expect(prismaService.channel.delete).toHaveBeenCalledWith({
        where: { id: channelId },
      });
    });
  });

  describe('create', () => {
    const mockChannelData = {
      ytId: 'UC123456789',
      title: 'Test Channel',
      src: 'https://example.com/channel',
      videoCount: 100,
    };

    const mockFetchStartVideoId = 'video123';

    it('should create a channel successfully', async () => {
      const createDto = { ytVideoId: 'hmF4Bm29R2w' };
      const mockCreatedChannel = {
        id: 1,
        ...mockChannelData,
        fetchStartVideoId: mockFetchStartVideoId,
      };

      mockYoutubeService.getChannelIdByVideoId.mockResolvedValue(
        mockChannelData.ytId,
      );
      mockPrismaService.channel.findUnique.mockResolvedValue(null);
      mockYoutubeService.getChannel.mockResolvedValue(mockChannelData);
      mockYoutubeService.getLatestUploadId.mockResolvedValue(
        mockFetchStartVideoId,
      );
      mockPrismaService.channel.create.mockResolvedValue(mockCreatedChannel);

      const result = await service.create(createDto);

      expect(mockYoutubeService.getChannelIdByVideoId).toHaveBeenCalledWith(
        createDto.ytVideoId,
      );
      expect(mockPrismaService.channel.findUnique).toHaveBeenCalledWith({
        where: { ytId: mockChannelData.ytId },
      });
      expect(mockYoutubeService.getChannel).toHaveBeenCalledWith(
        mockChannelData.ytId,
      );
      expect(mockYoutubeService.getLatestUploadId).toHaveBeenCalledWith(
        mockChannelData.ytId,
      );
      expect(mockPrismaService.channel.create).toHaveBeenCalledWith({
        data: {
          src: mockChannelData.src,
          title: mockChannelData.title,
          videoCount: mockChannelData.videoCount,
          ytId: mockChannelData.ytId,
          fetchStartVideoId: mockFetchStartVideoId,
        },
      });
      expect(result).toEqual({
        success: true,
        ytChannelId: mockChannelData.ytId,
      });
    });

    it('should return failure when channel already exists', async () => {
      const createDto = { ytVideoId: 'hmF4Bm29R2w' };
      const existingChannel = { id: 1, ...mockChannelData };

      mockYoutubeService.getChannelIdByVideoId.mockResolvedValue(
        mockChannelData.ytId,
      );
      mockPrismaService.channel.findUnique.mockResolvedValue(existingChannel);

      const result = await service.create(createDto);

      expect(mockYoutubeService.getChannelIdByVideoId).toHaveBeenCalledWith(
        createDto.ytVideoId,
      );
      expect(mockPrismaService.channel.findUnique).toHaveBeenCalledWith({
        where: { ytId: mockChannelData.ytId },
      });
      expect(result).toEqual({
        success: false,
        ytChannelId: mockChannelData.ytId,
      });
    });

    it('should throw error when getting channel ID fails', async () => {
      const createDto = { ytVideoId: 'invalid-video-id' };
      const mockError = new Error('Failed to get channel ID');

      mockYoutubeService.getChannelIdByVideoId.mockRejectedValue(mockError);

      await expect(service.create(createDto)).rejects.toThrow(
        'Failed to get channel ID',
      );
      expect(mockYoutubeService.getChannelIdByVideoId).toHaveBeenCalledWith(
        createDto.ytVideoId,
      );
    });

    it('should throw error when fetching channel from YouTube fails', async () => {
      const createDto = { ytVideoId: 'hmF4Bm29R2w' };

      mockYoutubeService.getChannelIdByVideoId.mockResolvedValue(
        mockChannelData.ytId,
      );
      mockPrismaService.channel.findUnique.mockResolvedValue(null);
      mockYoutubeService.getChannel.mockRejectedValue(
        new Error('YouTube API error'),
      );

      await expect(service.create(createDto)).rejects.toThrow(
        'Failed to fetch channel from youtube',
      );
      expect(mockYoutubeService.getChannel).toHaveBeenCalledWith(
        mockChannelData.ytId,
      );
    });

    it('should throw error when fetching latest upload fails', async () => {
      const createDto = { ytVideoId: 'hmF4Bm29R2w' };

      mockYoutubeService.getChannelIdByVideoId.mockResolvedValue(
        mockChannelData.ytId,
      );
      mockPrismaService.channel.findUnique.mockResolvedValue(null);
      mockYoutubeService.getChannel.mockResolvedValue(mockChannelData);
      mockYoutubeService.getLatestUploadId.mockRejectedValue(
        new Error('Failed to get latest upload'),
      );

      await expect(service.create(createDto)).rejects.toThrow(
        'Failed to fetch latest upload from youtube',
      );
      expect(mockYoutubeService.getLatestUploadId).toHaveBeenCalledWith(
        mockChannelData.ytId,
      );
    });

    it('should throw error when database creation fails', async () => {
      const createDto = { ytVideoId: 'hmF4Bm29R2w' };
      const mockError = new Error('Database error');

      mockYoutubeService.getChannelIdByVideoId.mockResolvedValue(
        mockChannelData.ytId,
      );
      mockPrismaService.channel.findUnique.mockResolvedValue(null);
      mockYoutubeService.getChannel.mockResolvedValue(mockChannelData);
      mockYoutubeService.getLatestUploadId.mockResolvedValue(
        mockFetchStartVideoId,
      );
      mockPrismaService.channel.create.mockRejectedValue(mockError);

      await expect(service.create(createDto)).rejects.toThrow(
        'Failed to create channel',
      );
      expect(mockPrismaService.channel.create).toHaveBeenCalledWith({
        data: {
          src: mockChannelData.src,
          title: mockChannelData.title,
          videoCount: mockChannelData.videoCount,
          ytId: mockChannelData.ytId,
          fetchStartVideoId: mockFetchStartVideoId,
        },
      });
    });
  });

  describe('metadata', () => {
    const mockChannel = {
      id: 1,
      title: 'Test Channel',
      ytId: 'UC123456789',
      src: 'https://example.com/channel',
      videoCount: 100,
      fetchedUntilEnd: false,
      lastSyncedAt: new Date('2023-01-01'),
    };

    it('should return channel metadata successfully', async () => {
      const ytChannelId = 'UC123456789';
      const mockCounts = {
        videoArtifacts: 25,
        savedArtifacts: 30,
        thumbnailArtifacts: 40,
        screenshotArtifacts: 50,
      };

      mockPrismaService.channel.findUnique.mockResolvedValue(mockChannel);
      mockPrismaService.uploadsVideo.count
        .mockResolvedValueOnce(mockCounts.videoArtifacts)
        .mockResolvedValueOnce(mockCounts.savedArtifacts)
        .mockResolvedValueOnce(mockCounts.thumbnailArtifacts);
      mockPrismaService.screenshot.count.mockResolvedValue(
        mockCounts.screenshotArtifacts,
      );

      const result = await service.metadata(ytChannelId);

      expect(mockPrismaService.channel.findUnique).toHaveBeenCalledWith({
        where: { ytId: ytChannelId },
      });

      expect(mockPrismaService.uploadsVideo.count).toHaveBeenCalledWith({
        where: {
          channelId: mockChannel.id,
          artifact: ArtifactType.VIDEO,
        },
      });

      expect(mockPrismaService.uploadsVideo.count).toHaveBeenCalledWith({
        where: {
          channelId: mockChannel.id,
          artifact: ArtifactType.SAVED,
        },
      });

      expect(mockPrismaService.uploadsVideo.count).toHaveBeenCalledWith({
        where: {
          channelId: mockChannel.id,
          artifact: ArtifactType.THUMBNAIL,
        },
      });

      expect(mockPrismaService.screenshot.count).toHaveBeenCalledWith({
        where: {
          ytChannelId: mockChannel.ytId,
        },
      });

      expect(result).toEqual({
        videoArtifactsCount: mockCounts.videoArtifacts,
        savedArtifactsCount: mockCounts.savedArtifacts,
        thumbnailArtifactsCount: mockCounts.thumbnailArtifacts,
        screenshotArtifactsCount: mockCounts.screenshotArtifacts,
        id: mockChannel.id,
        title: mockChannel.title,
        ytId: mockChannel.ytId,
        src: mockChannel.src,
        fetchedUntilEnd: mockChannel.fetchedUntilEnd,
        videoCount: mockChannel.videoCount,
        lastSyncedAt: mockChannel.lastSyncedAt,
      });
    });

    it('should throw error when channel not found', async () => {
      const ytChannelId = 'UC999999999';

      mockPrismaService.channel.findUnique.mockResolvedValue(null);

      await expect(service.metadata(ytChannelId)).rejects.toThrow(
        'Channel not found',
      );

      expect(mockPrismaService.channel.findUnique).toHaveBeenCalledWith({
        where: { ytId: ytChannelId },
      });
    });

    it('should handle zero counts for all artifact types', async () => {
      const ytChannelId = 'UC123456789';

      mockPrismaService.channel.findUnique.mockResolvedValue(mockChannel);
      mockPrismaService.uploadsVideo.count
        .mockResolvedValueOnce(0)
        .mockResolvedValueOnce(0)
        .mockResolvedValueOnce(0);
      mockPrismaService.screenshot.count.mockResolvedValue(0);

      const result = await service.metadata(ytChannelId);

      expect(result).toEqual({
        videoArtifactsCount: 0,
        savedArtifactsCount: 0,
        thumbnailArtifactsCount: 0,
        screenshotArtifactsCount: 0,
        id: mockChannel.id,
        title: mockChannel.title,
        ytId: mockChannel.ytId,
        src: mockChannel.src,
        fetchedUntilEnd: mockChannel.fetchedUntilEnd,
        videoCount: mockChannel.videoCount,
        lastSyncedAt: mockChannel.lastSyncedAt,
      });
    });

    it('should handle large counts for all artifact types', async () => {
      const ytChannelId = 'UC123456789';
      const mockCounts = {
        videoArtifacts: 10000,
        savedArtifacts: 15000,
        thumbnailArtifacts: 20000,
        screenshotArtifacts: 25000,
      };

      mockPrismaService.channel.findUnique.mockResolvedValue(mockChannel);
      mockPrismaService.uploadsVideo.count
        .mockResolvedValueOnce(mockCounts.videoArtifacts)
        .mockResolvedValueOnce(mockCounts.savedArtifacts)
        .mockResolvedValueOnce(mockCounts.thumbnailArtifacts);
      mockPrismaService.screenshot.count.mockResolvedValue(
        mockCounts.screenshotArtifacts,
      );

      const result = await service.metadata(ytChannelId);

      expect(result).toEqual({
        videoArtifactsCount: mockCounts.videoArtifacts,
        savedArtifactsCount: mockCounts.savedArtifacts,
        thumbnailArtifactsCount: mockCounts.thumbnailArtifacts,
        screenshotArtifactsCount: mockCounts.screenshotArtifacts,
        id: mockChannel.id,
        title: mockChannel.title,
        ytId: mockChannel.ytId,
        src: mockChannel.src,
        fetchedUntilEnd: mockChannel.fetchedUntilEnd,
        videoCount: mockChannel.videoCount,
        lastSyncedAt: mockChannel.lastSyncedAt,
      });
    });
  });
});
