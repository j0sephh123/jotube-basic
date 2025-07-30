import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OpenDirectoryDto {
  @ApiProperty({
    description: 'ytChannelId',
    example: 'ytChannelId',
  })
  @IsString()
  ytChannelId: string;

  @ApiProperty({
    description: 'ytVideoId',
    example: 'ytVideoId',
    required: false,
  })
  @IsString()
  ytVideoId?: string;
}
