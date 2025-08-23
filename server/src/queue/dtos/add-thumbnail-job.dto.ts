import { ApiProperty } from '@nestjs/swagger';
import { IsObject } from 'class-validator';

export class AddThumbnailJobDto {
  @ApiProperty({
    description: 'Data for the thumbnail job',
    example: { message: 'Thumbnail job data' },
  })
  @IsObject()
  data: { ytVideoId: string; ytChannelId: string }[];
}
