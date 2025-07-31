import { Controller, Get, Res, Logger } from '@nestjs/common';
import { Response } from 'express';
import { SseService } from './sse.service';

@Controller('sse')
export class SseController {
  private readonly logger = new Logger(SseController.name);

  constructor(private readonly sseService: SseService) {}

  @Get('updates')
  handleSse(@Res() res: Response) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Send the initial connection message
    res.write(`data: ${JSON.stringify({ message: 'Connected to SSE' })}\n\n`);

    this.sseService.addClient(res);

    // Send keep-alive messages every 30 seconds
    const keepAliveInterval = setInterval(() => {
      try {
        res.write(`data: ${JSON.stringify({ type: 'keep-alive' })}\n\n`);
      } catch (error) {
        this.logger.error('Error sending keep-alive:', error);
        clearInterval(keepAliveInterval);
        this.sseService.removeClient(res);
        res.end();
      }
    }, 30000);

    const cleanup = () => {
      clearInterval(keepAliveInterval);
      this.sseService.removeClient(res);
      res.end();
    };

    res.on('close', () => {
      this.logger.log('Client connection closed');
      cleanup();
    });

    res.on('error', (error) => {
      this.logger.error('Client connection error:', error);
      cleanup();
    });
  }
}
