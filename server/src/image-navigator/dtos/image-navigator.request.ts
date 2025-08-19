import { IsEnum, IsOptional, IsString } from 'class-validator';

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
}
