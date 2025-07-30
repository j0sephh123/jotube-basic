import { Test, TestingModule } from '@nestjs/testing';
import { YoutubeService } from './youtube.service';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/core/database/prisma/prisma.service';

function iso8601ToSeconds(duration: string): number {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const hours = parseInt(match[1] || '0', 10);
  const minutes = parseInt(match[2] || '0', 10);
  const seconds = parseInt(match[3] || '0', 10);
  return hours * 3600 + minutes * 60 + seconds;
}

describe('YoutubeService', () => {
  let service: YoutubeService;

  const mockConfigService = {
    get: jest.fn(),
  };

  const mockPrismaService = {};

  beforeEach(async () => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.useFakeTimers();

    global.fetch = jest.fn().mockImplementation(() => {
      throw new Error('Real API calls are not allowed in tests');
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        YoutubeService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<YoutubeService>(YoutubeService);

    jest.spyOn(service as any, 'delay').mockResolvedValue(undefined);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  describe('getAllUploads', () => {
    const ytChannelId = 'UC123456789';
    const channelId = 1;
    const apiKey = 'test-api-key';

    beforeEach(() => {
      mockConfigService.get.mockReturnValue(apiKey);
    });

    it('should fetch all uploads successfully', async () => {
      const mockPlaylistResponse = {
        items: [
          {
            snippet: {
              thumbnails: { high: { url: 'thumbnail1.jpg' } },
              publishedAt: '2023-01-01T00:00:00Z',
              resourceId: { videoId: 'video1' },
              title: 'Video 1',
            },
          },
          {
            snippet: {
              thumbnails: { high: { url: 'thumbnail2.jpg' } },
              publishedAt: '2023-01-02T00:00:00Z',
              resourceId: { videoId: 'video2' },
              title: 'Video 2',
            },
          },
        ],
        nextPageToken: null,
      };

      const mockVideosResponse = {
        items: [
          {
            id: 'video1',
            contentDetails: { duration: 'PT5M30S' },
            snippet: { title: 'Video 1' },
          },
          {
            id: 'video2',
            contentDetails: { duration: 'PT4M15S' },
            snippet: { title: 'Video 2' },
          },
        ],
      };

      global.fetch = jest
        .fn()
        .mockResolvedValueOnce({
          json: () => Promise.resolve(mockPlaylistResponse),
        })
        .mockResolvedValueOnce({
          json: () => Promise.resolve(mockVideosResponse),
        });

      const result = await service.fetchUploadsForChannel(
        ytChannelId,
        channelId,
      );

      expect(mockConfigService.get).toHaveBeenCalledWith('YOUTUBE_API_KEY');
      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        src: 'thumbnail1.jpg',
        publishedAt: '2023-01-01T00:00:00Z',
        ytId: 'video1',
        title: 'Video 1',
        channelId,
      });
    });

    it('should handle pagination correctly', async () => {
      const mockFirstPage = {
        items: [
          {
            snippet: {
              thumbnails: { high: { url: 'thumbnail1.jpg' } },
              publishedAt: '2023-01-01T00:00:00Z',
              resourceId: { videoId: 'video1' },
              title: 'Video 1',
            },
          },
        ],
        nextPageToken: 'next-page-token',
      };

      const mockSecondPage = {
        items: [
          {
            snippet: {
              thumbnails: { high: { url: 'thumbnail2.jpg' } },
              publishedAt: '2023-01-02T00:00:00Z',
              resourceId: { videoId: 'video2' },
              title: 'Video 2',
            },
          },
        ],
        nextPageToken: null,
      };

      const mockVideosResponse = {
        items: [
          {
            id: 'video1',
            contentDetails: { duration: 'PT5M30S' },
            snippet: { title: 'Video 1' },
          },
          {
            id: 'video2',
            contentDetails: { duration: 'PT4M15S' },
            snippet: { title: 'Video 2' },
          },
        ],
      };

      global.fetch = jest
        .fn()
        .mockResolvedValueOnce({
          json: () => Promise.resolve(mockFirstPage),
        })
        .mockResolvedValueOnce({
          json: () => Promise.resolve(mockSecondPage),
        })
        .mockResolvedValueOnce({
          json: () => Promise.resolve(mockVideosResponse),
        });

      const result = await service.fetchUploadsForChannel(
        ytChannelId,
        channelId,
      );

      expect(global.fetch).toHaveBeenCalledTimes(3);
      expect(result).toHaveLength(2);
    });

    it('should filter out videos shorter than 3 minutes', async () => {
      const mockPlaylistResponse = {
        items: [
          {
            snippet: {
              thumbnails: { high: { url: 'thumbnail1.jpg' } },
              publishedAt: '2023-01-01T00:00:00Z',
              resourceId: { videoId: 'video1' },
              title: 'Video 1',
            },
          },
          {
            snippet: {
              thumbnails: { high: { url: 'thumbnail2.jpg' } },
              publishedAt: '2023-01-02T00:00:00Z',
              resourceId: { videoId: 'video2' },
              title: 'Video 2',
            },
          },
        ],
        nextPageToken: null,
      };

      const mockVideosResponse = {
        items: [
          {
            id: 'video1',
            contentDetails: { duration: 'PT5M30S' },
            snippet: { title: 'Video 1' },
          },
          {
            id: 'video2',
            contentDetails: { duration: 'PT2M30S' },
            snippet: { title: 'Video 2' },
          },
        ],
      };

      global.fetch = jest
        .fn()
        .mockResolvedValueOnce({
          json: () => Promise.resolve(mockPlaylistResponse),
        })
        .mockResolvedValueOnce({
          json: () => Promise.resolve(mockVideosResponse),
        });

      const result = await service.fetchUploadsForChannel(
        ytChannelId,
        channelId,
      );

      expect(result).toHaveLength(1);
      expect(result[0].ytId).toBe('video1');
    });

    it('should handle API errors gracefully', async () => {
      const mockError = new Error('API Error');
      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.reject(mockError),
      );

      await expect(
        service.fetchUploadsForChannel(ytChannelId, channelId),
      ).rejects.toThrow('API Error');
    });

    it('should handle empty playlist response', async () => {
      const mockPlaylistResponse = {
        items: [],
        nextPageToken: null,
      };

      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockPlaylistResponse),
        }),
      );

      const result = await service.fetchUploadsForChannel(
        ytChannelId,
        channelId,
      );

      expect(result).toHaveLength(0);
    });
  });

  describe('syncUploads', () => {
    const ytChannelId = 'UC123456789';
    const ytVideoId = 'target-video-id';
    const channelId = 1;
    const apiKey = 'test-api-key';

    beforeEach(() => {
      mockConfigService.get.mockReturnValue(apiKey);
    });

    it('should sync uploads until target video is found', async () => {
      const mockResponse = {
        items: [
          {
            snippet: {
              title: 'Video 1',
              thumbnails: { high: { url: 'thumbnail1.jpg' } },
              publishedAt: '2023-01-01T00:00:00Z',
              resourceId: { videoId: 'video1' },
            },
          },
          {
            snippet: {
              title: 'Video 2',
              thumbnails: { high: { url: 'thumbnail2.jpg' } },
              publishedAt: '2023-01-02T00:00:00Z',
              resourceId: { videoId: 'target-video-id' },
            },
          },
        ],
        nextPageToken: null,
      };

      global.fetch = jest.fn().mockResolvedValue({
        json: () => Promise.resolve(mockResponse),
      });

      const result = await service.syncUploads(
        ytChannelId,
        ytVideoId,
        channelId,
      );

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        title: 'Video 1',
        src: 'thumbnail1.jpg',
        publishedAt: '2023-01-01T00:00:00Z',
        ytId: 'video1',
        channelId,
      });
    });

    it('should handle pagination in syncUploads', async () => {
      const mockFirstPage = {
        items: [
          {
            snippet: {
              title: 'Video 1',
              thumbnails: { high: { url: 'thumbnail1.jpg' } },
              publishedAt: '2023-01-01T00:00:00Z',
              resourceId: { videoId: 'video1' },
            },
          },
        ],
        nextPageToken: 'next-page-token',
      };

      const mockSecondPage = {
        items: [
          {
            snippet: {
              title: 'Video 2',
              thumbnails: { high: { url: 'thumbnail2.jpg' } },
              publishedAt: '2023-01-02T00:00:00Z',
              resourceId: { videoId: 'target-video-id' },
            },
          },
        ],
        nextPageToken: null,
      };

      global.fetch = jest
        .fn()
        .mockResolvedValueOnce({
          json: () => Promise.resolve(mockFirstPage),
        })
        .mockResolvedValueOnce({
          json: () => Promise.resolve(mockSecondPage),
        });

      const result = await service.syncUploads(
        ytChannelId,
        ytVideoId,
        channelId,
      );

      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect(result).toHaveLength(1);
    });

    it('should handle missing thumbnails', async () => {
      const mockResponse = {
        items: [
          {
            snippet: {
              title: 'Video 1',
              thumbnails: {},
              publishedAt: '2023-01-01T00:00:00Z',
              resourceId: { videoId: 'video1' },
            },
          },
          {
            snippet: {
              title: 'Video 2',
              thumbnails: { high: { url: 'thumbnail2.jpg' } },
              publishedAt: '2023-01-02T00:00:00Z',
              resourceId: { videoId: 'target-video-id' },
            },
          },
        ],
        nextPageToken: null,
      };

      global.fetch = jest.fn().mockResolvedValue({
        json: () => Promise.resolve(mockResponse),
      });

      const result = await service.syncUploads(
        ytChannelId,
        ytVideoId,
        channelId,
      );

      expect(result[0].src).toBe('');
    });

    it('should handle API errors in syncUploads', async () => {
      const mockError = new Error('API Error');
      global.fetch = jest.fn().mockRejectedValue(mockError);

      await expect(
        service.syncUploads(ytChannelId, ytVideoId, channelId),
      ).rejects.toThrow('API Error');
    });
  });

  describe('getChannelIdByVideoId', () => {
    const videoId = 'test-video-id';
    const apiKey = 'test-api-key';

    beforeEach(() => {
      mockConfigService.get.mockReturnValue(apiKey);
    });

    it('should return channel ID successfully', async () => {
      const mockResponse = {
        items: [
          {
            snippet: {
              channelId: 'UC123456789',
            },
          },
        ],
      };

      global.fetch = jest.fn().mockResolvedValue({
        json: () => Promise.resolve(mockResponse),
      });

      const result = await service.getChannelIdByVideoId(videoId);

      expect(result).toBe('UC123456789');
      expect(global.fetch).toHaveBeenCalledWith(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`,
      );
    });

    it('should handle API errors', async () => {
      const mockError = new Error('API Error');
      global.fetch = jest.fn().mockRejectedValue(mockError);

      await expect(service.getChannelIdByVideoId(videoId)).rejects.toThrow(
        'API Error',
      );
    });

    it('should handle empty response', async () => {
      const mockResponse = { items: [] };

      global.fetch = jest.fn().mockResolvedValue({
        json: () => Promise.resolve(mockResponse),
      });

      await expect(service.getChannelIdByVideoId(videoId)).rejects.toThrow();
    });
  });

  describe('getLatestUploadId', () => {
    const channelId = 'UC123456789';
    const apiKey = 'test-api-key';

    beforeEach(() => {
      mockConfigService.get.mockReturnValue(apiKey);
    });

    it('should return latest upload ID successfully', async () => {
      const mockResponse = {
        items: [
          {
            snippet: {
              resourceId: { videoId: 'latest-video-id' },
            },
          },
        ],
      };

      global.fetch = jest.fn().mockResolvedValue({
        json: () => Promise.resolve(mockResponse),
      });

      const result = await service.getLatestUploadId(channelId);

      expect(result).toBe('latest-video-id');
      expect(global.fetch).toHaveBeenCalledWith(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=1&playlistId=UU123456789&key=${apiKey}`,
      );
    });

    it('should handle API errors', async () => {
      const mockError = new Error('API Error');
      global.fetch = jest.fn().mockRejectedValue(mockError);

      await expect(service.getLatestUploadId(channelId)).rejects.toThrow(
        'API Error',
      );
    });

    it('should handle empty response', async () => {
      const mockResponse = { items: [] };

      global.fetch = jest.fn().mockResolvedValue({
        json: () => Promise.resolve(mockResponse),
      });

      await expect(service.getLatestUploadId(channelId)).rejects.toThrow();
    });
  });

  describe('getChannel', () => {
    const channelId = 'UC123456789';
    const apiKey = 'test-api-key';

    beforeEach(() => {
      mockConfigService.get.mockReturnValue(apiKey);
    });

    it('should return channel information successfully', async () => {
      const mockResponse = {
        items: [
          {
            id: 'UC123456789',
            snippet: {
              title: 'Test Channel',
              thumbnails: { high: { url: 'channel-thumbnail.jpg' } },
            },
            statistics: {
              videoCount: '100',
            },
          },
        ],
      };

      global.fetch = jest.fn().mockResolvedValue({
        json: () => Promise.resolve(mockResponse),
      });

      const result = await service.getChannel(channelId);

      expect(result).toEqual({
        ytId: 'UC123456789',
        title: 'Test Channel',
        src: 'channel-thumbnail.jpg',
        videoCount: 100,
      });
      expect(global.fetch).toHaveBeenCalledWith(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${channelId}&key=${apiKey}`,
      );
    });

    it('should handle API errors', async () => {
      const mockError = new Error('API Error');
      global.fetch = jest.fn().mockRejectedValue(mockError);

      await expect(service.getChannel(channelId)).rejects.toThrow('API Error');
    });

    it('should handle empty response', async () => {
      const mockResponse = { items: [] };

      global.fetch = jest.fn().mockResolvedValue({
        json: () => Promise.resolve(mockResponse),
      });

      await expect(service.getChannel(channelId)).rejects.toThrow();
    });
  });

  describe('iso8601ToSeconds', () => {
    it('should convert ISO8601 duration to seconds correctly', () => {
      const testCases = [
        { input: 'PT5M30S', expected: 330 },
        { input: 'PT1H2M30S', expected: 3750 },
        { input: 'PT30S', expected: 30 },
        { input: 'PT2H', expected: 7200 },
        { input: 'PT1M', expected: 60 },
        { input: 'PT0S', expected: 0 },
        { input: 'invalid', expected: 0 },
      ];

      testCases.forEach(({ input, expected }) => {
        const result = iso8601ToSeconds(input);
        expect(result).toBe(expected);
      });
    });
  });

  describe('delay', () => {
    it('should delay execution for specified milliseconds', async () => {
      const delaySpy = jest
        .spyOn(service as any, 'delay')
        .mockImplementation(() => Promise.resolve());

      await (service as any).delay(1000);

      expect(delaySpy).toHaveBeenCalledWith(1000);
    });
  });
});
