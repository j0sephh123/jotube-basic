import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class createChannelDto {
  @ApiProperty({
    description: 'Youtube Video Id',
    example: 'hmF4Bm29R2w',
  })
  @IsString()
  ytVideoId: string;
}
