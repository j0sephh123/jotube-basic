import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

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
