import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class AddPreviewDto {
  @ApiProperty({ description: 'Array of URLs' })
  @IsArray()
  @IsString({ each: true })
  urls: string[];

  @ApiProperty({ description: 'Array of IDs' })
  @IsArray()
  @IsNumber({}, { each: true })
  ids: number[];

  @ApiProperty({ description: 'How many items to process' })
  @IsNumber()
  howMany: number;
}
