import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';
import { SseService } from 'src/shared/sse/sse.service';

describe('EventsService', () => {
  let service: EventsService;

  const mockSseService = {
    sendEvent: jest.fn(),
  };

  beforeEach(async () => {
    jest.spyOn(console, 'log').mockImplementation(() => {});

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: SseService,
          useValue: mockSseService,
        },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('sendEvent', () => {
    const ytVideoId = 'test-video-id';

    describe('non-progress events', () => {
      const nonProgressEvents = [
        'thumbnails_start',
        'thumbnails_finish',
        'screenshots_start',
        'screenshots_finish',
        'download_start',
        'download_finish',
      ] as const;

      it.each(nonProgressEvents)(
        'should send %s event immediately without rate limiting',
        async (event) => {
          await service.sendEvent(event, ytVideoId);

          expect(mockSseService.sendEvent).toHaveBeenCalledWith({
            type: event,
            ytVideoId,
            progress: undefined,
          });
        },
      );

      it.each(nonProgressEvents)(
        'should send %s event with progress when provided',
        async (event) => {
          const progress = '50%';
          await service.sendEvent(event, ytVideoId, progress);

          expect(mockSseService.sendEvent).toHaveBeenCalledWith({
            type: event,
            ytVideoId,
            progress,
          });
        },
      );

      it.each(['screenshots_finish', 'download_finish'] as const)(
        'should clear lastSentTimes for %s event',
        async (event) => {
          await service.sendEvent(event, ytVideoId);

          expect(mockSseService.sendEvent).toHaveBeenCalledWith({
            type: event,
            ytVideoId,
            progress: undefined,
          });
        },
      );
    });

    describe('progress events', () => {
      const progressEvents = [
        'screenshots_progress',
        'download_progress',
      ] as const;

      it.each(progressEvents)(
        'should send %s event immediately on first call',
        async (event) => {
          const progress = '25%';
          await service.sendEvent(event, ytVideoId, progress);

          expect(mockSseService.sendEvent).toHaveBeenCalledWith({
            type: event,
            ytVideoId,
            progress,
          });
        },
      );

      it.each(progressEvents)(
        'should not send %s event if called within rate limit period',
        async (event) => {
          const progress1 = '25%';
          const progress2 = '50%';

          await service.sendEvent(event, ytVideoId, progress1);
          await service.sendEvent(event, ytVideoId, progress2);

          expect(mockSseService.sendEvent).toHaveBeenCalledTimes(1);
          expect(mockSseService.sendEvent).toHaveBeenCalledWith({
            type: event,
            ytVideoId,
            progress: progress1,
          });
        },
      );

      it.each(progressEvents)(
        'should send %s event for different video IDs independently',
        async (event) => {
          const ytVideoId1 = 'video1';
          const ytVideoId2 = 'video2';
          const progress1 = '25%';
          const progress2 = '50%';

          await service.sendEvent(event, ytVideoId1, progress1);
          await service.sendEvent(event, ytVideoId2, progress2);

          expect(mockSseService.sendEvent).toHaveBeenCalledTimes(2);
          expect(mockSseService.sendEvent).toHaveBeenNthCalledWith(1, {
            type: event,
            ytVideoId: ytVideoId1,
            progress: progress1,
          });
          expect(mockSseService.sendEvent).toHaveBeenNthCalledWith(2, {
            type: event,
            ytVideoId: ytVideoId2,
            progress: progress2,
          });
        },
      );

      it.each(progressEvents)(
        'should update lastSentTimes when sending %s event',
        async (event) => {
          const progress = '30%';
          await service.sendEvent(event, ytVideoId, progress);

          expect(mockSseService.sendEvent).toHaveBeenCalledWith({
            type: event,
            ytVideoId,
            progress,
          });
        },
      );
    });

    describe('mixed event scenarios', () => {
      it('should handle mix of progress and non-progress events', async () => {
        await service.sendEvent('download_start', ytVideoId);
        await service.sendEvent('download_progress', ytVideoId, '25%');
        await service.sendEvent('download_progress', ytVideoId, '50%');
        await service.sendEvent('download_finish', ytVideoId);

        expect(mockSseService.sendEvent).toHaveBeenCalledTimes(3);
        expect(mockSseService.sendEvent).toHaveBeenNthCalledWith(1, {
          type: 'download_start',
          ytVideoId,
          progress: undefined,
        });
        expect(mockSseService.sendEvent).toHaveBeenNthCalledWith(2, {
          type: 'download_progress',
          ytVideoId,
          progress: '25%',
        });
        expect(mockSseService.sendEvent).toHaveBeenNthCalledWith(3, {
          type: 'download_finish',
          ytVideoId,
          progress: undefined,
        });
      });

      it('should clear rate limit after finish event and allow new progress events', async () => {
        await service.sendEvent('download_progress', ytVideoId, '25%');
        await service.sendEvent('download_finish', ytVideoId);
        await service.sendEvent('download_progress', ytVideoId, '75%');

        expect(mockSseService.sendEvent).toHaveBeenCalledTimes(3);
        expect(mockSseService.sendEvent).toHaveBeenNthCalledWith(1, {
          type: 'download_progress',
          ytVideoId,
          progress: '25%',
        });
        expect(mockSseService.sendEvent).toHaveBeenNthCalledWith(2, {
          type: 'download_finish',
          ytVideoId,
          progress: undefined,
        });
        expect(mockSseService.sendEvent).toHaveBeenNthCalledWith(3, {
          type: 'download_progress',
          ytVideoId,
          progress: '75%',
        });
      });
    });

    describe('edge cases', () => {
      it('should handle empty ytVideoId', async () => {
        const event = 'thumbnails_start';
        await service.sendEvent(event, '', 'test-progress');

        expect(mockSseService.sendEvent).toHaveBeenCalledWith({
          type: event,
          ytVideoId: '',
          progress: 'test-progress',
        });
      });

      it('should handle undefined progress', async () => {
        const event = 'screenshots_start';
        await service.sendEvent(event, ytVideoId, undefined);

        expect(mockSseService.sendEvent).toHaveBeenCalledWith({
          type: event,
          ytVideoId,
          progress: undefined,
        });
      });

      it('should handle null progress', async () => {
        const event = 'download_start';
        await service.sendEvent(event, ytVideoId, null as any);

        expect(mockSseService.sendEvent).toHaveBeenCalledWith({
          type: event,
          ytVideoId,
          progress: null,
        });
      });

      it('should handle empty string progress', async () => {
        const event = 'thumbnails_finish';
        await service.sendEvent(event, ytVideoId, '');

        expect(mockSseService.sendEvent).toHaveBeenCalledWith({
          type: event,
          ytVideoId,
          progress: '',
        });
      });
    });

    describe('rate limiting behavior', () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(() => {
        jest.useRealTimers();
      });

      it('should respect rate limit for progress events', async () => {
        const event = 'screenshots_progress';
        const progress1 = '10%';
        const progress2 = '20%';
        const progress3 = '30%';

        await service.sendEvent(event, ytVideoId, progress1);
        jest.advanceTimersByTime(1000);
        await service.sendEvent(event, ytVideoId, progress2);
        jest.advanceTimersByTime(1000);
        await service.sendEvent(event, ytVideoId, progress3);

        expect(mockSseService.sendEvent).toHaveBeenCalledTimes(2);
        expect(mockSseService.sendEvent).toHaveBeenNthCalledWith(1, {
          type: event,
          ytVideoId,
          progress: progress1,
        });
        expect(mockSseService.sendEvent).toHaveBeenNthCalledWith(2, {
          type: event,
          ytVideoId,
          progress: progress3,
        });
      });

      it('should send event exactly at rate limit boundary', async () => {
        const event = 'download_progress';
        const progress1 = '25%';
        const progress2 = '50%';

        await service.sendEvent(event, ytVideoId, progress1);
        jest.advanceTimersByTime(2000);
        await service.sendEvent(event, ytVideoId, progress2);

        expect(mockSseService.sendEvent).toHaveBeenCalledTimes(2);
        expect(mockSseService.sendEvent).toHaveBeenNthCalledWith(1, {
          type: event,
          ytVideoId,
          progress: progress1,
        });
        expect(mockSseService.sendEvent).toHaveBeenNthCalledWith(2, {
          type: event,
          ytVideoId,
          progress: progress2,
        });
      });
    });
  });
});
