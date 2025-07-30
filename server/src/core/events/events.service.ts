import { Injectable } from '@nestjs/common';
import { SseService } from 'src/shared/sse/sse.service';

@Injectable()
export class EventsService {
  private lastSentTimes = new Map<string, number>();
  private readonly RATE_LIMIT_MS = 2000;

  constructor(private readonly sseService: SseService) {}

  async sendEvent(
    event:
      | 'thumbnails_start'
      | 'thumbnails_finish'
      | 'screenshots_start'
      | 'screenshots_progress'
      | 'screenshots_finish'
      | 'download_start'
      | 'download_progress'
      | 'download_finish',
    ytVideoId: string,
    progress?: string,
  ) {
    const now = Date.now();
    const lastSent = this.lastSentTimes.get(ytVideoId) || 0;

    if (event === 'screenshots_progress' || event === 'download_progress') {
      if (now - lastSent >= this.RATE_LIMIT_MS) {
        this.sseService.sendEvent({
          type: event,
          ytVideoId,
          progress,
        });

        this.lastSentTimes.set(ytVideoId, now);
      }
    } else {
      this.sseService.sendEvent({
        type: event,
        ytVideoId,
        progress,
      });
      if (event === 'screenshots_finish' || event === 'download_finish') {
        this.lastSentTimes.delete(ytVideoId);
      }
    }
  }
}
