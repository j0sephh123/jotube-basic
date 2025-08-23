import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

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
