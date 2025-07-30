import { Test, TestingModule } from '@nestjs/testing';
import { ThumbnailsService } from './thumbnails.service';
import { FilePathService } from 'src/file/file-path.service';
import { EventsService } from 'src/core/events/events.service';
import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';

jest.mock('fs');
jest.mock('path');
jest.mock('sharp');

describe('ThumbnailsService', () => {
  let service: ThumbnailsService;
  let filePathService: FilePathService;
  let eventsService: EventsService;

  const mockFilePathService = {
    getBasePath: jest.fn(),
  };

  const mockEventsService = {
    sendEvent: jest.fn(),
  };

  const mockFs = fs as jest.Mocked<typeof fs>;
  const mockPath = path as jest.Mocked<typeof path>;
  const mockSharp = sharp as jest.MockedFunction<typeof sharp> & jest.Mock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ThumbnailsService,
        {
          provide: FilePathService,
          useValue: mockFilePathService,
        },
        {
          provide: EventsService,
          useValue: mockEventsService,
        },
      ],
    }).compile();

    service = module.get<ThumbnailsService>(ThumbnailsService);
    filePathService = module.get<FilePathService>(FilePathService);
    eventsService = module.get<EventsService>(EventsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('generateThumbnails', () => {
    const mockBasePath = '/base/path';
    const mockYtChannelId = 'testChannel';
    const mockYtVideoId = 'testVideo';
    const mockScreenshotsDir = `${mockBasePath}/${mockYtChannelId}/${mockYtVideoId}/all_screenshots`;
    const mockThumbnailsDir = `${mockBasePath}/${mockYtChannelId}/${mockYtVideoId}/thumbnails`;

    beforeEach(() => {
      mockFilePathService.getBasePath.mockReturnValue(mockBasePath);
      mockPath.join.mockImplementation((...args) => args.join('/'));
      mockPath.dirname.mockReturnValue(mockThumbnailsDir);
      mockFs.existsSync.mockReturnValue(false);
      mockFs.mkdirSync.mockImplementation(() => undefined);

      const mockSharpInstance = {
        resize: jest.fn().mockReturnThis(),
        toBuffer: jest.fn().mockResolvedValue(Buffer.from('mock-image-data')),
        composite: jest.fn().mockReturnThis(),
        toFile: jest.fn().mockResolvedValue(undefined),
      };

      mockSharp.mockReturnValue(mockSharpInstance as any);
    });

    it('should generate thumbnails successfully with default framesPerRow', async () => {
      const mockFiles = [
        'video-10.png',
        'video-20.png',
        'video-30.png',
        'video-40.png',
        'video-50.png',
        'video-60.png',
        'video-70.png',
        'video-80.png',
        'video-90.png',
        'video-100.png',
      ];

      mockFs.readdirSync.mockReturnValue(mockFiles as any);

      const result = await service.generateThumbnails({
        ytChannelId: mockYtChannelId,
        ytVideoId: mockYtVideoId,
      });

      expect(eventsService.sendEvent).toHaveBeenCalledWith(
        'thumbnails_start',
        mockYtVideoId,
      );
      expect(eventsService.sendEvent).toHaveBeenCalledWith(
        'thumbnails_finish',
        mockYtVideoId,
      );
      expect(filePathService.getBasePath).toHaveBeenCalledTimes(1);
      expect(mockFs.readdirSync).toHaveBeenCalledWith(mockScreenshotsDir);
      expect(result).toEqual({
        success: true,
        paths: [`${mockThumbnailsDir}/0.png`],
        totalFrames: 10,
        totalFiles: 1,
      });
    });

    it('should generate thumbnails with custom framesPerRow', async () => {
      const mockFiles = [
        'video-10.png',
        'video-20.png',
        'video-30.png',
        'video-40.png',
        'video-50.png',
      ];

      mockFs.readdirSync.mockReturnValue(mockFiles as any);

      const result = await service.generateThumbnails({
        ytChannelId: mockYtChannelId,
        ytVideoId: mockYtVideoId,
        framesPerRow: 4,
      });

      expect(eventsService.sendEvent).toHaveBeenCalledWith(
        'thumbnails_start',
        mockYtVideoId,
      );
      expect(eventsService.sendEvent).toHaveBeenCalledWith(
        'thumbnails_finish',
        mockYtVideoId,
      );
      expect(result).toEqual({
        success: true,
        paths: [`${mockThumbnailsDir}/0.png`],
        totalFrames: 5,
        totalFiles: 1,
      });
    });

    it('should generate multiple thumbnail files when there are many screenshots', async () => {
      const mockFiles = Array.from(
        { length: 50 },
        (_, i) => `video-${(i + 1) * 10}.png`,
      );

      mockFs.readdirSync.mockReturnValue(mockFiles as any);

      const result = await service.generateThumbnails({
        ytChannelId: mockYtChannelId,
        ytVideoId: mockYtVideoId,
        framesPerRow: 8,
      });

      expect(result.totalFrames).toBe(50);
      expect(result.totalFiles).toBe(2);
      expect(result.paths).toHaveLength(2);
      expect(result.paths[0]).toBe(`${mockThumbnailsDir}/0.png`);
      expect(result.paths[1]).toBe(`${mockThumbnailsDir}/1.png`);
    });

    it('should create thumbnails directory if it does not exist', async () => {
      const mockFiles = ['video-10.png'];

      mockFs.readdirSync.mockReturnValue(mockFiles as any);
      mockFs.existsSync.mockReturnValue(false);

      await service.generateThumbnails({
        ytChannelId: mockYtChannelId,
        ytVideoId: mockYtVideoId,
      });

      expect(mockFs.existsSync).toHaveBeenCalledWith(mockThumbnailsDir);
      expect(mockFs.mkdirSync).toHaveBeenCalledWith(mockThumbnailsDir, {
        recursive: true,
      });
    });

    it('should not create thumbnails directory if it already exists', async () => {
      const mockFiles = ['video-10.png'];

      mockFs.readdirSync.mockReturnValue(mockFiles as any);
      mockFs.existsSync.mockReturnValue(true);

      await service.generateThumbnails({
        ytChannelId: mockYtChannelId,
        ytVideoId: mockYtVideoId,
      });

      expect(mockFs.existsSync).toHaveBeenCalledWith(mockThumbnailsDir);
      expect(mockFs.mkdirSync).not.toHaveBeenCalled();
    });

    it('should filter only PNG files from screenshots directory', async () => {
      const mockFiles = [
        'video-10.png',
        'video-20.jpg',
        'video-30.png',
        'video-40.txt',
        'video-50.png',
      ];

      mockFs.readdirSync.mockReturnValue(mockFiles as any);

      const result = await service.generateThumbnails({
        ytChannelId: mockYtChannelId,
        ytVideoId: mockYtVideoId,
      });

      expect(result.totalFrames).toBe(3);
    });

    it('should sort files by extracted seconds', async () => {
      const mockFiles = [
        'video-50.png',
        'video-10.png',
        'video-30.png',
        'video-20.png',
      ];

      mockFs.readdirSync.mockReturnValue(mockFiles as any);

      await service.generateThumbnails({
        ytChannelId: mockYtChannelId,
        ytVideoId: mockYtVideoId,
      });

      expect(mockFs.readdirSync).toHaveBeenCalledWith(mockScreenshotsDir);
    });

    it('should handle empty screenshots directory', async () => {
      mockFs.readdirSync.mockReturnValue([] as any);

      const result = await service.generateThumbnails({
        ytChannelId: mockYtChannelId,
        ytVideoId: mockYtVideoId,
      });

      expect(result).toEqual({
        success: true,
        paths: [],
        totalFrames: 0,
        totalFiles: 0,
      });
    });

    it('should throw error when screenshots directory does not exist', async () => {
      const mockError = new Error('Directory not found');
      mockFs.readdirSync.mockImplementation(() => {
        throw mockError;
      });

      await expect(
        service.generateThumbnails({
          ytChannelId: mockYtChannelId,
          ytVideoId: mockYtVideoId,
        }),
      ).rejects.toThrow('Directory not found');
    });

    it('should throw error when sharp processing fails', async () => {
      const mockFiles = ['video-10.png'];
      const mockError = new Error('Sharp processing failed');

      mockFs.readdirSync.mockReturnValue(mockFiles as any);
      mockSharp.mockImplementation(() => {
        throw mockError;
      });

      await expect(
        service.generateThumbnails({
          ytChannelId: mockYtChannelId,
          ytVideoId: mockYtVideoId,
        }),
      ).rejects.toThrow('Sharp processing failed');
    });
  });
});
