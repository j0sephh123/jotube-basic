import { ApiProperty } from '@nestjs/swagger';
import { JobState } from './job-state.enum';

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
