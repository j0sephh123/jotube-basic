import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class AddChannelsDto {
  @ApiProperty({
    description: 'Array of channel IDs',
    type: [Number],
  })
  @IsArray()
  @IsNumber({}, { each: true })
  channelIds: number[];
}
