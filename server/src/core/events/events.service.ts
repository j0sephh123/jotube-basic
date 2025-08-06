import { Injectable } from '@nestjs/common';
import { EventsGateway } from '../../events.gateway';

@Injectable()
export class EventsService {
  constructor(private readonly eventsGateway: EventsGateway) {}

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
    this.eventsGateway.sendEvent(event, ytVideoId, progress);
  }
}
