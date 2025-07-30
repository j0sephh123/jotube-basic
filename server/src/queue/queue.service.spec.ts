import { Test, TestingModule } from '@nestjs/testing';
import { QueueService } from './queue.service';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { getQueueToken } from '@nestjs/bull';
import { queueNames } from 'src/shared/constants';

describe('QueueService', () => {
  let service: QueueService;
  let prismaService: PrismaService;
  let videoProcessor: any;

  const mockPrismaService = {
    channel: {
      findFirst: jest.fn(),
      findMany: jest.fn(),
    },
    uploadsVideo: {
      findFirst: jest.fn(),
    },
  };

  const mockVideoProcessor = {
    add: jest.fn(),
    getJobs: jest.fn(),
    getJob: jest.fn(),
  };

  beforeEach(async () => {
    jest.spyOn(console, 'log').mockImplementation(() => {});

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QueueService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: getQueueToken(queueNames.video),
          useValue: mockVideoProcessor,
        },
      ],
    }).compile();

    service = module.get<QueueService>(QueueService);
    prismaService = module.get<PrismaService>(PrismaService);
    videoProcessor = module.get(getQueueToken(queueNames.video));
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('addUploads', () => {
    it('should return success when no uploads provided', async () => {
      const result = await service.addUploads([]);
      expect(result).toEqual({ success: true });
    });

    it('should return success when null uploads provided', async () => {
      const result = await service.addUploads(null as any);
      expect(result).toEqual({ success: true });
    });

    it('should return success when undefined uploads provided', async () => {
      const result = await service.addUploads(undefined as any);
      expect(result).toEqual({ success: true });
    });

    it('should add individual video jobs successfully', async () => {
      const addVideosDto = [
        {
          ytVideoIds: ['video1', 'video2'],
          ytChannelId: 'channel1',
        },
      ];

      const existingJobs = [{ data: { ytVideoId: 'existingVideo' } }];

      mockVideoProcessor.getJobs.mockResolvedValue(existingJobs);
      mockVideoProcessor.add.mockResolvedValue(undefined);

      const result = await service.addUploads(addVideosDto);

      expect(mockVideoProcessor.getJobs).toHaveBeenCalledWith([
        'active',
        'waiting',
      ]);
      expect(mockVideoProcessor.add).toHaveBeenCalledTimes(2);
      expect(mockVideoProcessor.add).toHaveBeenCalledWith({
        ytVideoId: 'video1',
        ytChannelId: 'channel1',
        type: 'downloadAndCaptureScreenshotsAndGenerateThumbnails',
      });
      expect(mockVideoProcessor.add).toHaveBeenCalledWith({
        ytVideoId: 'video2',
        ytChannelId: 'channel1',
        type: 'downloadAndCaptureScreenshotsAndGenerateThumbnails',
      });
      expect(result).toEqual({ success: true });
    });

    it('should add channel-based jobs successfully with downloadOption 0', async () => {
      const addVideosDto = [
        {
          ytChannelId: 'channel1',
          downloadOption: 0,
        },
      ];

      const mockChannel = {
        ytId: 'channel1',
        uploads: [
          { ytId: 'video1', status: 1, artifact: 'SAVED' },
          { ytId: 'video2', status: 1, artifact: 'SAVED' },
        ],
      };

      const existingJobs = [];

      mockPrismaService.channel.findFirst.mockResolvedValue(mockChannel);
      mockVideoProcessor.getJobs.mockResolvedValue(existingJobs);
      mockVideoProcessor.add.mockResolvedValue(undefined);

      const result = await service.addUploads(addVideosDto);

      expect(mockPrismaService.channel.findFirst).toHaveBeenCalledWith({
        where: { ytId: 'channel1' },
        include: {
          uploads: {
            where: {
              status: 1,
              artifact: 'SAVED',
            },
          },
        },
      });
      expect(mockVideoProcessor.add).toHaveBeenCalledTimes(2);
      expect(result).toEqual({ success: true });
    });

    it('should add channel-based jobs successfully with specific downloadOption', async () => {
      const addVideosDto = [
        {
          ytChannelId: 'channel1',
          downloadOption: 1,
        },
      ];

      const mockChannel = {
        ytId: 'channel1',
        uploads: [
          { ytId: 'video1', status: 1, artifact: 'SAVED' },
          { ytId: 'video2', status: 1, artifact: 'SAVED' },
        ],
      };

      const existingJobs = [];

      mockPrismaService.channel.findFirst.mockResolvedValue(mockChannel);
      mockVideoProcessor.getJobs.mockResolvedValue(existingJobs);
      mockVideoProcessor.add.mockResolvedValue(undefined);

      const result = await service.addUploads(addVideosDto);

      expect(mockVideoProcessor.add).toHaveBeenCalledTimes(1);
      expect(mockVideoProcessor.add).toHaveBeenCalledWith({
        ytVideoId: 'video1',
        ytChannelId: 'channel1',
        type: 'downloadAndCaptureScreenshotsAndGenerateThumbnails',
      });
      expect(result).toEqual({ success: true });
    });

    it('should skip channel when no uploads found', async () => {
      const addVideosDto = [
        {
          ytChannelId: 'channel1',
          downloadOption: 0,
        },
      ];

      const mockChannel = {
        ytId: 'channel1',
        uploads: [],
      };

      mockPrismaService.channel.findFirst.mockResolvedValue(mockChannel);

      const result = await service.addUploads(addVideosDto);

      expect(mockPrismaService.channel.findFirst).toHaveBeenCalled();
      expect(mockVideoProcessor.add).not.toHaveBeenCalled();
      expect(result).toEqual({ success: true });
    });

    it('should skip channel when channel not found', async () => {
      const addVideosDto = [
        {
          ytChannelId: 'channel1',
          downloadOption: 0,
        },
      ];

      mockPrismaService.channel.findFirst.mockResolvedValue(null);

      const result = await service.addUploads(addVideosDto);

      expect(mockPrismaService.channel.findFirst).toHaveBeenCalled();
      expect(mockVideoProcessor.add).not.toHaveBeenCalled();
      expect(result).toEqual({ success: true });
    });

    it('should filter out existing jobs', async () => {
      const addVideosDto = [
        {
          ytVideoIds: ['video1', 'video2'],
          ytChannelId: 'channel1',
        },
      ];

      const existingJobs = [{ data: { ytVideoId: 'video1' } }];

      mockVideoProcessor.getJobs.mockResolvedValue(existingJobs);
      mockVideoProcessor.add.mockResolvedValue(undefined);

      const result = await service.addUploads(addVideosDto);

      expect(mockVideoProcessor.add).toHaveBeenCalledTimes(1);
      expect(mockVideoProcessor.add).toHaveBeenCalledWith({
        ytVideoId: 'video2',
        ytChannelId: 'channel1',
        type: 'downloadAndCaptureScreenshotsAndGenerateThumbnails',
      });
      expect(result).toEqual({ success: true });
    });

    it('should handle mixed video IDs and channel IDs', async () => {
      const addVideosDto = [
        {
          ytVideoIds: ['video1'],
          ytChannelId: 'channel1',
        },
        {
          ytChannelId: 'channel2',
          downloadOption: 1,
        },
      ];

      const mockChannel = {
        ytId: 'channel2',
        uploads: [{ ytId: 'video2', status: 1, artifact: 'SAVED' }],
      };

      const existingJobs = [];

      mockPrismaService.channel.findFirst.mockResolvedValue(mockChannel);
      mockVideoProcessor.getJobs.mockResolvedValue(existingJobs);
      mockVideoProcessor.add.mockResolvedValue(undefined);

      const result = await service.addUploads(addVideosDto);

      expect(mockVideoProcessor.add).toHaveBeenCalledTimes(2);
      expect(result).toEqual({ success: true });
    });
  });

  describe('removeFromVideoQueue', () => {
    it('should remove jobs successfully', async () => {
      const removeJobsDto = { jobIds: ['job1', 'job2'] };
      const mockJob1 = { remove: jest.fn() };
      const mockJob2 = { remove: jest.fn() };

      mockVideoProcessor.getJob
        .mockResolvedValueOnce(mockJob1)
        .mockResolvedValueOnce(mockJob2);

      const result = await service.removeFromVideoQueue(removeJobsDto);

      expect(mockVideoProcessor.getJob).toHaveBeenCalledWith('job1');
      expect(mockVideoProcessor.getJob).toHaveBeenCalledWith('job2');
      expect(mockJob1.remove).toHaveBeenCalled();
      expect(mockJob2.remove).toHaveBeenCalled();
      expect(result).toEqual([
        { jobId: 'job1', message: 'Job job1 removed successfully' },
        { jobId: 'job2', message: 'Job job2 removed successfully' },
      ]);
    });

    it('should handle job not found', async () => {
      const removeJobsDto = { jobIds: ['job1', 'job2'] };
      const mockJob2 = { remove: jest.fn() };

      mockVideoProcessor.getJob
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(mockJob2);

      const result = await service.removeFromVideoQueue(removeJobsDto);

      expect(result).toEqual([
        { jobId: 'job1', message: 'Job not found' },
        { jobId: 'job2', message: 'Job job2 removed successfully' },
      ]);
    });

    it('should handle empty job IDs array', async () => {
      const removeJobsDto = { jobIds: [] };

      const result = await service.removeFromVideoQueue(removeJobsDto);

      expect(mockVideoProcessor.getJob).not.toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('getLabels', () => {
    it('should return channel labels successfully', async () => {
      const labelsDto = {
        items: [
          { type: 'ytChannelId', id: 'channel1' },
          { type: 'ytChannelId', id: 'channel2' },
        ],
      };

      const mockChannels = [
        { title: 'Channel 1', ytId: 'channel1' },
        { title: 'Channel 2', ytId: 'channel2' },
      ];

      mockPrismaService.channel.findMany.mockResolvedValue(mockChannels);

      const result = await service.getLabels(labelsDto);

      expect(mockPrismaService.channel.findMany).toHaveBeenCalledWith({
        where: {
          ytId: {
            in: ['channel1', 'channel2'],
          },
        },
        select: {
          title: true,
          ytId: true,
        },
      });
      expect(result).toEqual(mockChannels);
    });

    it('should filter out non-channel items', async () => {
      const labelsDto = {
        items: [
          { type: 'ytChannelId', id: 'channel1' },
          { type: 'otherType', id: 'other1' },
          { type: 'ytChannelId', id: 'channel2' },
        ],
      };

      const mockChannels = [
        { title: 'Channel 1', ytId: 'channel1' },
        { title: 'Channel 2', ytId: 'channel2' },
      ];

      mockPrismaService.channel.findMany.mockResolvedValue(mockChannels);

      const result = await service.getLabels(labelsDto);

      expect(mockPrismaService.channel.findMany).toHaveBeenCalledWith({
        where: {
          ytId: {
            in: ['channel1', 'channel2'],
          },
        },
        select: {
          title: true,
          ytId: true,
        },
      });
      expect(result).toEqual(mockChannels);
    });

    it('should handle empty items array', async () => {
      const labelsDto = { items: [] };

      const mockChannels = [];

      mockPrismaService.channel.findMany.mockResolvedValue(mockChannels);

      const result = await service.getLabels(labelsDto);

      expect(mockPrismaService.channel.findMany).toHaveBeenCalledWith({
        where: {
          ytId: {
            in: [],
          },
        },
        select: {
          title: true,
          ytId: true,
        },
      });
      expect(result).toEqual(mockChannels);
    });
  });

  describe('getVideoLabel', () => {
    it('should return video label successfully', async () => {
      const ytVideoId = 'video1';
      const mockVideo = {
        ytId: 'video1',
        title: 'Test Video',
        channel: {
          title: 'Test Channel',
        },
      };

      mockPrismaService.uploadsVideo.findFirst.mockResolvedValue(mockVideo);

      const result = await (service as any).getVideoLabel(ytVideoId);

      expect(mockPrismaService.uploadsVideo.findFirst).toHaveBeenCalledWith({
        where: {
          ytId: ytVideoId,
        },
        select: {
          ytId: true,
          title: true,
          channel: {
            select: {
              title: true,
            },
          },
        },
      });
      expect(result).toEqual(mockVideo);
    });

    it('should return null when video not found', async () => {
      const ytVideoId = 'nonexistent';

      mockPrismaService.uploadsVideo.findFirst.mockResolvedValue(null);

      const result = await (service as any).getVideoLabel(ytVideoId);

      expect(result).toBeNull();
    });
  });

  describe('getScreenshotsQueue', () => {
    it('should return queue data with labels successfully', async () => {
      const mockJobs = [
        {
          id: 'job1',
          data: { ytVideoId: 'video1', ytChannelId: 'channel1' },
          getState: jest.fn().mockResolvedValue('waiting'),
        },
        {
          id: 'job2',
          data: { ytVideoId: 'video2', ytChannelId: 'channel1' },
          getState: jest.fn().mockResolvedValue('active'),
        },
      ];

      const mockVideoLabels = [
        {
          ytId: 'video1',
          title: 'Video 1',
          channel: { title: 'Channel 1' },
        },
        {
          ytId: 'video2',
          title: 'Video 2',
          channel: { title: 'Channel 1' },
        },
      ];

      const mockChannelLabels = [{ ytId: 'channel1', title: 'Channel 1' }];

      mockVideoProcessor.getJobs.mockResolvedValue(mockJobs);
      mockPrismaService.uploadsVideo.findFirst
        .mockResolvedValueOnce(mockVideoLabels[0])
        .mockResolvedValueOnce(mockVideoLabels[1]);
      mockPrismaService.channel.findMany.mockResolvedValue(mockChannelLabels);

      const result = await service.getScreenshotsQueue();

      expect(mockVideoProcessor.getJobs).toHaveBeenCalledWith([
        'active',
        'waiting',
      ]);
      expect(result).toEqual([
        {
          id: 'job1',
          state: 'waiting',
          ytVideoId: 'video1',
          ytChannelId: 'channel1',
          videoTitle: 'Video 1',
          channelTitle: 'Channel 1',
        },
        {
          id: 'job2',
          state: 'active',
          ytVideoId: 'video2',
          ytChannelId: 'channel1',
          videoTitle: 'Video 2',
          channelTitle: 'Channel 1',
        },
      ]);
    });

    it('should handle missing video labels', async () => {
      const mockJobs = [
        {
          id: 'job1',
          data: { ytVideoId: 'video1', ytChannelId: 'channel1' },
          getState: jest.fn().mockResolvedValue('waiting'),
        },
      ];

      const mockChannelLabels = [{ ytId: 'channel1', title: 'Channel 1' }];

      mockVideoProcessor.getJobs.mockResolvedValue(mockJobs);
      mockPrismaService.uploadsVideo.findFirst.mockResolvedValue(null);
      mockPrismaService.channel.findMany.mockResolvedValue(mockChannelLabels);

      const result = await service.getScreenshotsQueue();

      expect(result).toEqual([
        {
          id: 'job1',
          state: 'waiting',
          ytVideoId: 'video1',
          ytChannelId: 'channel1',
          videoTitle: 'video1',
          channelTitle: 'Channel 1',
        },
      ]);
    });

    it('should handle missing channel labels', async () => {
      const mockJobs = [
        {
          id: 'job1',
          data: { ytVideoId: 'video1', ytChannelId: 'channel1' },
          getState: jest.fn().mockResolvedValue('waiting'),
        },
      ];

      const mockVideoLabels = [
        {
          ytId: 'video1',
          title: 'Video 1',
          channel: { title: 'Channel 1' },
        },
      ];

      mockVideoProcessor.getJobs.mockResolvedValue(mockJobs);
      mockPrismaService.uploadsVideo.findFirst.mockResolvedValue(
        mockVideoLabels[0],
      );
      mockPrismaService.channel.findMany.mockResolvedValue([]);

      const result = await service.getScreenshotsQueue();

      expect(result).toEqual([
        {
          id: 'job1',
          state: 'waiting',
          ytVideoId: 'video1',
          ytChannelId: 'channel1',
          videoTitle: 'Video 1',
          channelTitle: 'channel1',
        },
      ]);
    });

    it('should handle empty queue', async () => {
      mockVideoProcessor.getJobs.mockResolvedValue([]);

      const result = await service.getScreenshotsQueue();

      expect(result).toEqual([]);
    });
  });
});
