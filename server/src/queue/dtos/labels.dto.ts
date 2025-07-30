import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsIn, IsString, ValidateNested } from 'class-validator';

export class LabelRequestDto {
  @ApiProperty({
    description:
      'The type of identifier. It can be "ytVideoId", "ytChannelId", or "tv".',
    example: 'ytVideoId',
  })
  @IsString()
  @IsIn(['ytVideoId', 'ytChannelId', 'tv'])
  type: string;

  @ApiProperty({
    description: 'The unique identifier corresponding to the type.',
    example: 'abc123',
  })
  @IsString()
  id: string;
}

export class LabelsDto {
  @ApiProperty({
    description: 'Array of label objects containing type and id.',
    example: [
      { type: 'ytVideoId', id: 'abc123' },
      { type: 'ytChannelId', id: 'UCVH-tP3Ik1o8s27JUb8SC3w' },
      { type: 'ytChannelId', id: 'UC2Ah-21bnLL0OOmpuKL6fng' },
      { type: 'tv', id: 'tv789' },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LabelRequestDto)
  items: LabelRequestDto[];
}
