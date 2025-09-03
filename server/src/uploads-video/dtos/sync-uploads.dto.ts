import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class syncUploadsDto {
  @ApiProperty({
    description: 'channelId',
    example: 39,
  })
  @IsNumber()
  channelId: number;
}
