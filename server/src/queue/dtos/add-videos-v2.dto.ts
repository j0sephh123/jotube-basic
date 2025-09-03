import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class AddVideosv2Dto {
  @IsNumber()
  channelId: number;

  @IsArray()
  @IsString({ each: true })
  ytVideoIds: string[];
}

export class AddVideosv2ArrayDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddVideosv2Dto)
  items: AddVideosv2Dto[];
}
