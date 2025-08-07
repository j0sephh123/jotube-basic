import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class createStoryboardDto {
  @ApiProperty({
    description: 'ytVideoId',
    example: 'ytVideoId',
  })
  @IsString()
  ytVideoId: string;
}
