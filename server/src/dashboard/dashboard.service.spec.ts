import { Test, TestingModule } from '@nestjs/testing';
import { DashboardService } from './dashboard.service';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { fetchDashboardDto } from './dtos/fetch-dashboard.dto';

describe('DashboardService', () => {
  let service: DashboardService;

  const mockPrismaService = {
    channel: {
      findMany: jest.fn(),
      count: jest.fn(),
    },
    screenshot: {
      count: jest.fn(),
      findFirst: jest.fn(),
    },
  };

  const mockChannel = {
    id: 1,
    title: 'Test Channel',
    ytId: 'UC123456789',
    src: 'https://example.com/channel',
    createdAt: new Date('2023-01-01'),
    lastSyncedAt: new Date('2023-01-01'),
    uploads: [
      { id: 1, ytId: 'video1', artifact: 'SAVED' },
      { id: 2, ytId: 'video2', artifact: 'THUMBNAIL' },
      { id: 3, ytId: 'video3', artifact: 'VIDEO' },
      { id: 4, ytId: 'video4', artifact: 'SCREENSHOT' },
    ],
    screenshots: [{ ytVideoId: 'video1', second: 10 }],
  };

  beforeEach(async () => {
    jest.spyOn(console, 'log').mockImplementation(() => {});

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('fetchDashboard', () => {
    const baseDto: fetchDashboardDto = {
      page: 1,
      sortOrder: 'desc',
    };

    it('should fetch dashboard with saved view type', async () => {
      const dto: fetchDashboardDto = { ...baseDto, viewType: 'saved' };
      const mockChannels = [mockChannel];
      const mockScreenshotsCount = 5;

      mockPrismaService.channel.findMany.mockResolvedValue(mockChannels);
      mockPrismaService.screenshot.count.mockResolvedValue(
        mockScreenshotsCount,
      );

      const result = await service.fetchDashboard(dto);

      expect(mockPrismaService.channel.findMany).toHaveBeenCalledWith({
        where: {
          uploads: { some: { status: 1, artifact: 'SAVED' } },
        },
        select: {
          id: true,
          createdAt: true,
          title: true,
          ytId: true,
          src: true,
          lastSyncedAt: true,
          uploads: {
            select: {
              id: true,
              ytId: true,
              artifact: true,
            },
          },
          screenshots: {
            where: {
              isFav: true,
            },
            select: {
              ytVideoId: true,
              second: true,
            },
          },
        },
      });

      expect(result.channels).toHaveLength(1);
      expect(result.total).toBe(1);
      expect(result.channels[0]).toHaveProperty('saved', 1);
      expect(result.channels[0]).toHaveProperty('thumbnails', 1);
      expect(result.channels[0]).toHaveProperty('defaults', 1);
      expect(result.channels[0]).toHaveProperty('uploadsWithScreenshots', 1);
      expect(result.channels[0]).toHaveProperty(
        'screenshotsCount',
        mockScreenshotsCount,
      );
    });

    it('should fetch dashboard with processed view type', async () => {
      const dto: fetchDashboardDto = { ...baseDto, viewType: 'processed' };
      const mockChannels = [mockChannel];
      const mockScreenshotsCount = 5;

      mockPrismaService.channel.findMany.mockResolvedValue(mockChannels);
      mockPrismaService.screenshot.count.mockResolvedValue(
        mockScreenshotsCount,
      );

      const result = await service.fetchDashboard(dto);

      expect(mockPrismaService.channel.findMany).toHaveBeenCalledWith({
        where: {
          screenshots: { some: {} },
        },
        select: {
          id: true,
          createdAt: true,
          title: true,
          ytId: true,
          src: true,
          lastSyncedAt: true,
          uploads: {
            select: {
              id: true,
              ytId: true,
              artifact: true,
            },
          },
          screenshots: {
            where: {
              isFav: true,
            },
            select: {
              ytVideoId: true,
              second: true,
            },
          },
        },
      });

      expect(result.channels).toHaveLength(1);
      expect(result.channels[0]).toHaveProperty(
        'screenshotsCount',
        mockScreenshotsCount,
      );
    });

    it('should apply min filter for saved view', async () => {
      const dto: fetchDashboardDto = { ...baseDto, viewType: 'saved', min: 2 };
      const mockChannels = [
        {
          ...mockChannel,
          uploads: [{ id: 1, ytId: 'video1', artifact: 'SAVED' }],
        },
        {
          ...mockChannel,
          id: 2,
          uploads: [
            { id: 2, ytId: 'video2', artifact: 'SAVED' },
            { id: 3, ytId: 'video3', artifact: 'SAVED' },
          ],
        },
      ];

      mockPrismaService.channel.findMany.mockResolvedValue(mockChannels);
      mockPrismaService.screenshot.count.mockResolvedValue(0);

      const result = await service.fetchDashboard(dto);

      expect(result.channels).toHaveLength(1);
      expect(result.channels[0].id).toBe(2);
    });

    it('should apply max filter for processed view', async () => {
      const dto: fetchDashboardDto = {
        ...baseDto,
        viewType: 'processed',
        max: 3,
      };
      const mockChannels = [mockChannel];

      mockPrismaService.channel.findMany.mockResolvedValue(mockChannels);
      mockPrismaService.screenshot.count.mockResolvedValue(5);

      const result = await service.fetchDashboard(dto);

      expect(result.channels).toHaveLength(0);
    });

    it('should apply defaultMin and defaultMax filters', async () => {
      const dto = { ...baseDto, defaultMin: 1, defaultMax: 2 };
      const mockChannels = [
        {
          ...mockChannel,
          uploads: [{ id: 1, ytId: 'video1', artifact: 'VIDEO' }],
        },
        {
          ...mockChannel,
          id: 2,
          uploads: [
            { id: 2, ytId: 'video2', artifact: 'VIDEO' },
            { id: 3, ytId: 'video3', artifact: 'VIDEO' },
          ],
        },
        {
          ...mockChannel,
          id: 3,
          uploads: [
            { id: 4, ytId: 'video4', artifact: 'VIDEO' },
            { id: 5, ytId: 'video5', artifact: 'VIDEO' },
            { id: 6, ytId: 'video6', artifact: 'VIDEO' },
          ],
        },
      ];

      mockPrismaService.channel.findMany.mockResolvedValue(mockChannels);
      mockPrismaService.screenshot.count.mockResolvedValue(0);

      const result = await service.fetchDashboard(dto);

      expect(result.channels).toHaveLength(2);
      expect(result.channels[0].id).toBe(1);
      expect(result.channels[1].id).toBe(2);
    });

    it('should apply pagination', async () => {
      const dto = { ...baseDto, page: 2 };
      const mockChannels = Array.from({ length: 20 }, (_, i) => ({
        ...mockChannel,
        id: i + 1,
      }));

      mockPrismaService.channel.findMany.mockResolvedValue(mockChannels);
      mockPrismaService.screenshot.count.mockResolvedValue(0);

      const result = await service.fetchDashboard(dto);

      expect(result.channels).toHaveLength(8);
      expect(result.total).toBe(20);
    });

    it('should apply sorting in ascending order', async () => {
      const dto: fetchDashboardDto = { ...baseDto, sortOrder: 'asc' };
      const mockChannels = [
        {
          ...mockChannel,
          id: 1,
          uploads: [{ id: 1, ytId: 'video1', artifact: 'SAVED' }],
        },
        {
          ...mockChannel,
          id: 2,
          uploads: [
            { id: 2, ytId: 'video2', artifact: 'SAVED' },
            { id: 3, ytId: 'video3', artifact: 'SAVED' },
          ],
        },
      ];

      mockPrismaService.channel.findMany.mockResolvedValue(mockChannels);
      mockPrismaService.screenshot.count.mockResolvedValue(0);

      const result = await service.fetchDashboard(dto);

      expect(result.channels[0].id).toBe(1);
      expect(result.channels[1].id).toBe(2);
    });
  });

  describe('getDashboardCount', () => {
    const baseDto: fetchDashboardDto = {
      page: 1,
      sortOrder: 'desc',
    };

    it('should return total count for saved view', async () => {
      const dto: fetchDashboardDto = { ...baseDto, viewType: 'saved' };
      const mockChannels = [mockChannel];

      mockPrismaService.channel.findMany.mockResolvedValue(mockChannels);
      mockPrismaService.screenshot.count.mockResolvedValue(0);

      const result = await service.getDashboardCount(dto);

      expect(result).toEqual({ total: 1 });
    });

    it('should return total count for processed view', async () => {
      const dto: fetchDashboardDto = { ...baseDto, viewType: 'processed' };
      const mockChannels = [mockChannel];

      mockPrismaService.channel.findMany.mockResolvedValue(mockChannels);
      mockPrismaService.screenshot.count.mockResolvedValue(5);

      const result = await service.getDashboardCount(dto);

      expect(result).toEqual({ total: 1 });
    });

    it('should apply filters and return filtered count', async () => {
      const dto = { ...baseDto, min: 2 };
      const mockChannels = [
        {
          ...mockChannel,
          uploads: [{ id: 1, ytId: 'video1', artifact: 'SAVED' }],
        },
        {
          ...mockChannel,
          id: 2,
          uploads: [
            { id: 2, ytId: 'video2', artifact: 'SAVED' },
            { id: 3, ytId: 'video3', artifact: 'SAVED' },
          ],
        },
      ];

      mockPrismaService.channel.findMany.mockResolvedValue(mockChannels);
      mockPrismaService.screenshot.count.mockResolvedValue(0);

      const result = await service.getDashboardCount(dto);

      expect(result).toEqual({ total: 1 });
    });
  });

  describe('getChannelsWithoutScreenshots', () => {
    it('should return channels without screenshots', async () => {
      const mockChannels = [mockChannel];
      const mockTotal = 1;

      mockPrismaService.channel.findMany.mockResolvedValue(mockChannels);
      mockPrismaService.channel.count.mockResolvedValue(mockTotal);

      const result = await service.getChannelsWithoutScreenshots({
        sortOrder: 'desc',
        page: 1,
        perPage: 10,
      });

      expect(mockPrismaService.channel.findMany).toHaveBeenCalledWith({
        where: {
          fetchedUntilEnd: true,
          uploads: { every: { status: 0 } },
        },
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          createdAt: true,
          title: true,
          ytId: true,
          src: true,
          lastSyncedAt: true,
        },
        skip: 0,
        take: 10,
      });

      expect(mockPrismaService.channel.count).toHaveBeenCalledWith({
        where: {
          fetchedUntilEnd: true,
          uploads: { every: { status: 0 } },
        },
      });

      expect(result).toEqual({
        channels: mockChannels,
        total: mockTotal,
      });
    });

    it('should apply pagination correctly', async () => {
      const mockChannels = [mockChannel];
      const mockTotal = 1;

      mockPrismaService.channel.findMany.mockResolvedValue(mockChannels);
      mockPrismaService.channel.count.mockResolvedValue(mockTotal);

      await service.getChannelsWithoutScreenshots({
        sortOrder: 'asc',
        page: 3,
        perPage: 5,
      });

      expect(mockPrismaService.channel.findMany).toHaveBeenCalledWith({
        where: {
          fetchedUntilEnd: true,
          uploads: { every: { status: 0 } },
        },
        orderBy: { createdAt: 'asc' },
        select: {
          id: true,
          createdAt: true,
          title: true,
          ytId: true,
          src: true,
          lastSyncedAt: true,
        },
        skip: 10,
        take: 5,
      });
    });
  });

  describe('getChannelsWithoutUploads', () => {
    it('should return channels without uploads with default parameters', async () => {
      const mockChannels = [mockChannel];

      mockPrismaService.channel.findMany.mockResolvedValue(mockChannels);

      const result = await service.getChannelsWithoutUploads();

      expect(mockPrismaService.channel.findMany).toHaveBeenCalledWith({
        where: {
          fetchedUntilEnd: false,
        },
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          title: true,
          ytId: true,
          createdAt: true,
          src: true,
          videoCount: true,
        },
      });

      expect(result).toEqual(mockChannels);
    });

    it('should return channels without uploads with custom parameters', async () => {
      const mockChannels = [mockChannel];

      mockPrismaService.channel.findMany.mockResolvedValue(mockChannels);

      const result = await service.getChannelsWithoutUploads(
        'videoCount',
        'asc',
      );

      expect(mockPrismaService.channel.findMany).toHaveBeenCalledWith({
        where: {
          fetchedUntilEnd: false,
        },
        orderBy: {
          videoCount: 'asc',
        },
        select: {
          id: true,
          title: true,
          ytId: true,
          createdAt: true,
          src: true,
          videoCount: true,
        },
      });

      expect(result).toEqual(mockChannels);
    });
  });
});
