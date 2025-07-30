import { IsString, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class SaveUploadItemDto {
  @ApiProperty({
    description: 'ytVideoId',
    example: 'jJuHme256bw',
  })
  @IsString()
  ytVideoId: string;

  @ApiProperty({
    description: 'ytChannelId',
    example: 'UC9CuvdOVfMPvKCiwdGKL3cQ',
  })
  @IsString()
  ytChannelId: string;
}

export class saveUploadDto {
  @ApiProperty({
    description: 'Array of uploads to save',
    type: [SaveUploadItemDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SaveUploadItemDto)
  uploads: SaveUploadItemDto[];
}
