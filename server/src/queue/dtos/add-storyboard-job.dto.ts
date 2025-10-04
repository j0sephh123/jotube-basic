import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, IsIn } from 'class-validator';

export class AddStoryboardJobDto {
  @ApiProperty({ description: 'Array of YouTube video IDs' })
  @IsArray()
  @IsString({ each: true })
  ids: string[];

  @ApiProperty({
    description: 'Resource type for storyboard job',
    enum: ['channel', 'video'],
  })
  @IsIn(['channel', 'video'], {
    message: 'Resource type must be either "channel" or "video"',
  })
  resourceType: 'channel' | 'video';
}
