import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

interface DeleteUploadsEvent {
  type: 'delete-uploads';
  ytChannelId: string;
  ytVideoIds: string[];
  timestamp: Date;
  message: string;
}

@Injectable()
@WebSocketGateway({ cors: true })
export class EventsGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  server: Server;

  private connectedClients: Set<string> = new Set();

  afterInit() {
    console.log(
      'EventsGateway initialized, server:',
      this.server ? 'available' : 'not available',
    );
  }

  handleConnection(client: Socket) {
    this.connectedClients.add(client.id);
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.connectedClients.delete(client.id);
    console.log(`Client disconnected: ${client.id}`);
  }

  public broadcastDeleteUploadsEvent(
    ytChannelId: string,
    ytVideoIds: string[],
  ) {
    console.log('broadcastDeleteUploadsEvent called with:', {
      ytChannelId,
      ytVideoIds,
    });

    if (!this.server) {
      console.error('WebSocket server is not available');
      return;
    }

    const event: DeleteUploadsEvent = {
      type: 'delete-uploads',
      ytChannelId,
      ytVideoIds,
      timestamp: new Date(),
      message: `Deleted ${ytVideoIds.length > 0 ? ytVideoIds.length : 'all'} upload(s) from channel ${ytChannelId}`,
    };

    this.server.emit('deleteUploadsEvent', event);
    console.log('WebSocket event sent:', event);
  }
}
