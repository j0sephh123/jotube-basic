import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, ArrayNotEmpty, ArrayUnique } from 'class-validator';

export class deleteUploadsDto {
  @ApiProperty({
    description: 'YouTube Channel ID',
    example: 'UC_x5XG1OV2P6uZZ5FSM9Ttw',
  })
  @IsString()
  ytChannelId: string;

  @ApiProperty({
    description: 'Array of YouTube Video IDs',
    example: ['dQw4w9WgXcQ', '9bZkp7q19f0'],
    type: [String],
  })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsString({ each: true })
  ytVideoIds: string[];
}
