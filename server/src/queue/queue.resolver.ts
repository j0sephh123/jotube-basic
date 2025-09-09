import { Resolver, Query } from '@nestjs/graphql';
import { QueueService } from './queue.service';
import { ProcessingReadyUploadsResponse } from './dtos/processing-ready-uploads';

@Resolver()
export class QueueResolver {
  constructor(private readonly queueService: QueueService) {}

  @Query(() => ProcessingReadyUploadsResponse)
  async getProcessingReadyUploads(): Promise<ProcessingReadyUploadsResponse> {
    return this.queueService.getProcessingReadyUploads();
  }
}
