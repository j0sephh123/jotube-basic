import { ApiProperty } from '@nestjs/swagger';
import { IsObject } from 'class-validator';

export class AddDownloadJobDto {
  @ApiProperty({
    description: 'Data for the download job',
    example: { message: 'Download job data' },
  })
  @IsObject()
  data: { ytVideoId: string; ytChannelId: string }[];
}
