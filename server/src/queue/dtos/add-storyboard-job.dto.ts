import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsString,
  IsIn,
  IsOptional,
  IsNumber,
  Min,
} from 'class-validator';

export class AddStoryboardJobDto {
  @ApiProperty({ description: 'Array of YouTube video IDs' })
  @IsArray()
  @IsString({ each: true })
  ids: string[];

  @ApiProperty({
    description: 'Resource type for storyboard job',
    enum: ['channel', 'video', 'playlist'],
  })
  @IsIn(['channel', 'video', 'playlist'], {
    message: 'Resource type must be either "channel", "video", or "playlist"',
  })
  resourceType: 'channel' | 'video' | 'playlist';

  @ApiProperty({
    description: 'Optional limit for number of videos to process',
    required: false,
    minimum: 1,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number;
}
