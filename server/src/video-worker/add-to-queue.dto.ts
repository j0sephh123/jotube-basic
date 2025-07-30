import { IsString, IsArray, IsOptional, IsEnum } from 'class-validator';

export enum JobType {
  DOWNLOAD_ONLY = 'downloadOnly',
  CAPTURE_SCREENSHOTS_ONLY = 'captureScreenshotsOnly',
  GENERATE_THUMBNAILS_ONLY = 'generateThumbnailsOnly',
  DOWNLOAD_AND_CAPTURE_SCREENSHOTS_AND_GENERATE_THUMBNAILS = 'downloadAndCaptureScreenshotsAndGenerateThumbnails',
}

export class QueueElement {
  @IsString()
  url: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  ytChannelId: string;

  @IsString()
  ytVideoId: string;

  @IsEnum(JobType)
  type: JobType;
}

export class AddToQueueDto {
  @IsArray()
  elements: QueueElement[];
}
