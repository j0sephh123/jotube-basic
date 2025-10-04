import { Body, Controller, Get, Post } from '@nestjs/common';
import { QueueService } from './queue.service';
import { LabelsDto } from 'src/queue/dtos/labels.dto';
import { RemoveJobsDto } from 'src/queue/dtos/remove-jobs.dto';
import { AddVideosv2Dto } from 'src/queue/dtos/add-videos-v2.dto';
import { AddStoryboardJobDto } from 'src/queue/dtos/add-storyboard-job.dto';
import { AddEpisodeJobDto } from './dtos/add-episode.dto';

@Controller('queues')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Post('/add-uploads')
  async addVideosv2(@Body() body: AddVideosv2Dto[]) {
    return this.queueService.addUploads(body);
  }

  @Get('/queue')
  getQueue() {
    return this.queueService.getQueue();
  }

  @Post('/remove')
  removeFromVideoQueue(@Body() removeJobsDto: RemoveJobsDto) {
    return this.queueService.removeFromVideoQueue(removeJobsDto);
  }

  @Post('/labels')
  getLabels(@Body() labelsDto: LabelsDto) {
    return this.queueService.getLabels(labelsDto);
  }

  @Post('/add-storyboard')
  addStoryboard(@Body() body: AddStoryboardJobDto) {
    return this.queueService.addStoryboardJob(body);
  }

  @Post('/add-episode')
  addEpisode(@Body() body: AddEpisodeJobDto) {
    return this.queueService.addEpisodeJob(body);
  }
}
