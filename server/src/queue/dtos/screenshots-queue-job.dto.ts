import { ApiProperty } from '@nestjs/swagger';
import { JobState } from './job-state.enum';

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
