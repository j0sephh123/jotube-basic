import { IsString } from 'class-validator';

export class savedUploadsDto {
  @IsString({ each: true })
  ytChannelIds: string[];
}
