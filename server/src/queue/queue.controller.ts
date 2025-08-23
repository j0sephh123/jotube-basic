import { Body, Controller, Get, Post } from '@nestjs/common';
import { QueueService } from './queue.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LabelsDto } from 'src/queue/dtos/labels.dto';
import { RemoveJobsDto } from 'src/queue/dtos/remove-jobs.dto';
import { AddVideosv2Dto } from 'src/queue/dtos/add-videos-v2.dto';
import { AddStoryboardJobDto } from 'src/queue/dtos/add-storyboard-job.dto';
import { ScreenshotsQueueJobDto } from 'src/queue/dtos/screenshots-queue-job.dto';

@Controller('queues')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Post('/add-uploads')
  @ApiOperation({ summary: 'Add videos to the queue' })
  async addVideosv2(@Body() body: any) {
    let items: AddVideosv2Dto[];

    if (Array.isArray(body)) {
      items = body;
    } else if (body && body.items && Array.isArray(body.items)) {
      items = body.items;
    } else {
      return { success: true };
    }

    return this.queueService.addUploads(items);
  }

  @Get('/queue')
  @ApiOperation({ summary: 'Get screenshots queue' })
  @ApiResponse({
    status: 200,
    description: 'The list of active and waiting jobs in the queue',
    type: ScreenshotsQueueJobDto,
    isArray: true,
  })
  getScreenshotsQueue() {
    return this.queueService.getQueue();
  }

  @ApiOperation({ summary: 'Remove from video queue' })
  @Post('/remove')
  removeFromVideoQueue(@Body() removeJobsDto: RemoveJobsDto) {
    return this.queueService.removeFromVideoQueue(removeJobsDto);
  }

  @Post('/labels')
  getLabels(@Body() labelsDto: LabelsDto) {
    return this.queueService.getLabels(labelsDto);
  }

  @Post('/add-storyboard')
  @ApiOperation({ summary: 'Add storyboard job to queue' })
  addStoryboard(@Body() body: AddStoryboardJobDto) {
    return this.queueService.addStoryboardJob(body.data);
  }
}
