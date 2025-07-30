import { Injectable, Logger } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class SseService {
  private readonly logger = new Logger(SseService.name);
  private clients: Response[] = [];

  addClient(client: Response) {
    this.logger.log('New SSE client connected');
    this.clients.push(client);
  }

  removeClient(client: Response) {
    const index = this.clients.indexOf(client);
    if (index !== -1) {
      this.logger.log('SSE client disconnected');
      this.clients.splice(index, 1);
    }
  }

  sendEvent(data: object) {
    if (this.clients.length === 0) {
      this.logger.debug('No SSE clients connected to send event to');
      return;
    }
    this.logger.debug(
      `Sending SSE event to ${this.clients.length} clients:`,
      data,
    );
    this.clients.forEach((client) => {
      try {
        client.write(`data: ${JSON.stringify(data)}\n\n`);
      } catch (error) {
        this.logger.error('Error sending SSE event:', error);
        this.removeClient(client);
      }
    });
  }
}
