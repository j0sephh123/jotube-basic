import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class syncUploadsDto {
  @ApiProperty({
    description: 'ytChannelId',
    example: 'UCaCqdf3lpFirdBvAp3F8Kbw',
  })
  @IsString()
  ytChannelId: string;

  @ApiProperty({
    description: 'channelId',
    example: 39,
  })
  @IsNumber()
  channelId: number;
}
