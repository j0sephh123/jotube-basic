import { Body, Controller, Get, Post } from '@nestjs/common';
import { QueueService } from './queue.service';
import { ApiOperation, ApiResponse, ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsArray,
  ValidateNested,
  IsObject,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { LabelsDto } from 'src/queue/dtos/labels.dto';

export enum JobState {
  ACTIVE = 'active',
  WAITING = 'waiting',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export class AddChannelsDto {
  @ApiProperty({
    description: 'Array of channel IDs',
    type: [Number],
  })
  @IsArray()
  @IsNumber({}, { each: true })
  channelIds: number[];
}

export class PreviewQueueDto {
  @ApiProperty({
    description: 'Current state of the job',
    enum: JobState,
    example: JobState.ACTIVE,
  })
  state: JobState;

  @ApiProperty({
    description: 'YouTube channel identifier',
    example: 'UCp8S85oDVWCHLZZbaUD33mw',
  })
  ytChannelId: string;

  @ApiProperty({
    description: 'YouTube video identifier',
    example: '11 symbols',
  })
  id: string;
}

export class RemoveJobsDto {
  @ApiProperty({
    description: 'Array of job IDs to remove',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  jobIds: string[];
}

export class ScreenshotsQueueJobDto {
  @ApiProperty({
    description: 'YouTube channel title',
    example: 'Poker Bounty',
  })
  channelTitle: string;

  @ApiProperty({
    description: 'Unique identifier for the job',
    example: '7225',
  })
  id: string;

  @ApiProperty({
    description: 'Current state of the job',
    enum: JobState,
    example: JobState.ACTIVE,
  })
  state: JobState;

  @ApiProperty({
    description: 'Type of job being processed',
    example: 'downloadAndCaptureScreenshotsAndGenerateThumbnails',
    enum: ['downloadAndCaptureScreenshotsAndGenerateThumbnails'],
  })
  type: 'downloadAndCaptureScreenshotsAndGenerateThumbnails';

  @ApiProperty({
    description: 'YouTube video title',
    example: 'Phil Hellmuth Sparks Poker Controversy For The WSOP',
  })
  videoTitle: string;

  @ApiProperty({
    description: 'YouTube channel identifier',
    example: 'UCp8S85oDVWCHLZZbaUD33mw',
  })
  ytChannelId: string;

  @ApiProperty({
    description: 'YouTube video identifier',
    example: '8sK7l0wjpsI',
  })
  ytVideoId: string;
}

export class YtChannelIdsDto {
  @ApiProperty({
    description: 'Array of YouTube channel IDs',
    type: [String],
    example: ['UC12345abcde', 'UC67890fghij'],
  })
  @IsArray()
  @IsString({ each: true })
  ytChannelIds: string[];
}

export class AddPreviewDto {
  @ApiProperty({ description: 'Array of URLs' })
  @IsArray()
  @IsString({ each: true })
  urls: string[];

  @ApiProperty({ description: 'Array of IDs' })
  @IsArray()
  @IsNumber({}, { each: true })
  ids: number[];

  @ApiProperty({ description: 'How many items to process' })
  @IsNumber()
  howMany: number;
}

export class AddVideosv2Dto {
  @ApiProperty({
    description:
      'Download option for the video(s). 0 = all videos, any other number = that many videos. If ytVideoIds is provided, this is ignored.',
    example: 0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  downloadOption?: number;

  @ApiProperty({
    description: 'YouTube channel identifier',
    example: 'UCp8S85oDVWCHLZZbaUD33mw',
    required: false,
  })
  @IsOptional()
  @IsString()
  ytChannelId?: string;

  @ApiProperty({
    description: 'Array of specific YouTube video IDs to download',
    type: [String],
    example: ['videoId1', 'videoId2'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  ytVideoIds?: string[];
}

export class AddVideosv2ArrayDto {
  @ApiProperty({
    description: 'Array of download requests',
    type: [AddVideosv2Dto],
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddVideosv2Dto)
  items: AddVideosv2Dto[];
}

export class AddDownloadJobDto {
  @ApiProperty({
    description: 'Data for the download job',
    example: { message: 'Download job data' },
  })
  @IsObject()
  data: { ytVideoId: string; ytChannelId: string }[];
}

export class AddThumbnailJobDto {
  @ApiProperty({
    description: 'Data for the thumbnail job',
    example: { message: 'Thumbnail job data' },
  })
  @IsObject()
  data: { ytVideoId: string; ytChannelId: string }[];
}

export class AddStoryboardJobDto {
  @ApiProperty({ description: 'Storyboard job payload' })
  @IsObject()
  data: { ytVideoId: string };
}

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
    return this.queueService.getScreenshotsQueue();
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
