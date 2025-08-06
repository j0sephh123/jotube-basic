import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Injectable, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

interface ProcessEvent {
  type:
    | 'download_start'
    | 'download_progress'
    | 'download_finish'
    | 'screenshots_start'
    | 'screenshots_progress'
    | 'screenshots_finish'
    | 'thumbnails_start'
    | 'thumbnails_finish';
  ytVideoId: string;
  progress?: string;
}

@Injectable()
@WebSocketGateway({ cors: true })
export class EventsGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(EventsGateway.name);
  private connectedClients: Set<string> = new Set();
  private lastSentTimes = new Map<string, number>();
  private readonly RATE_LIMIT_MS = 2000;

  afterInit() {
    this.logger.log(
      'EventsGateway initialized, server:',
      this.server ? 'available' : 'not available',
    );
  }

  handleConnection(client: Socket) {
    this.connectedClients.add(client.id);
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.connectedClients.delete(client.id);
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  public sendEvent(
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
    if (!this.server) {
      this.logger.error('WebSocket server is not available');
      return;
    }

    const now = Date.now();
    const lastSent = this.lastSentTimes.get(ytVideoId) || 0;

    if (event === 'screenshots_progress' || event === 'download_progress') {
      if (now - lastSent >= this.RATE_LIMIT_MS) {
        const processEvent: ProcessEvent = {
          type: event,
          ytVideoId,
          progress,
        };

        this.server.emit('processEvent', processEvent);
        this.logger.debug(
          `Sending process event to ${this.connectedClients.size} clients:`,
          processEvent,
        );
        this.lastSentTimes.set(ytVideoId, now);
      }
    } else {
      const processEvent: ProcessEvent = {
        type: event,
        ytVideoId,
        progress,
      };

      this.server.emit('processEvent', processEvent);
      this.logger.debug(
        `Sending process event to ${this.connectedClients.size} clients:`,
        processEvent,
      );

      if (event === 'screenshots_finish' || event === 'download_finish') {
        this.lastSentTimes.delete(ytVideoId);
      }
    }
  }

  public getClientCount(): number {
    return this.connectedClients.size;
  }
}
