import { Injectable } from '@nestjs/common';
import { EventsGateway } from '../../events.gateway';
import { EventTypes } from 'src/shared/types';

@Injectable()
export class EventsService {
  constructor(private readonly eventsGateway: EventsGateway) {}

  async sendEvent(event: EventTypes, ytVideoId: string, progress?: string) {
    this.eventsGateway.sendEvent(event, { ytVideoId, progress });
  }
}
