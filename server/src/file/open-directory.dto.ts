import { IsString, IsOptional } from 'class-validator';
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
  @IsOptional()
  @IsString()
  ytVideoId?: string;
}
