import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class fetchUploadsDto {
  @ApiProperty({
    description: 'ytChannelId',
    example: 'ytChannelId',
  })
  @IsString()
  ytChannelId: string;
}
