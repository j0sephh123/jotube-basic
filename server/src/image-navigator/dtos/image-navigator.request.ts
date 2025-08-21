import { IsEnum, IsOptional, IsString, IsArray } from 'class-validator';

export enum ImageNavigatorType {
  ALL = 'all',
  VIDEO = 'video',
  CHANNEL = 'channel',
}

export class ImageNavigatorRequestDto {
  @IsEnum(ImageNavigatorType)
  type: ImageNavigatorType;

  @IsOptional()
  @IsString()
  ytVideoId?: string;

  @IsOptional()
  @IsString()
  ytChannelId?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skipChannels?: string[];
}
