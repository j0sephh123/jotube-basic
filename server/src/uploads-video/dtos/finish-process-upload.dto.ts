import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class FinishProcessUploadDto {
  @ApiProperty({
    description: 'ytChannelId',
    example: 'ytChannelId',
  })
  @IsString()
  ytChannelId: string;

  @ApiProperty({
    description: 'ytVideoId',
    example: 'ytVideoId',
  })
  @IsString()
  ytVideoId: string;

  @ApiProperty({
    description: 'Array of saved seconds',
    example: [10, 20, 30],
  })
  @IsArray()
  @IsNumber({}, { each: true })
  savedSeconds: number[];
}
