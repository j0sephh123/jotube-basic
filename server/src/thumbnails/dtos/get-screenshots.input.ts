import { InputType, Field } from '@nestjs/graphql';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsEnum,
  ValidateIf,
} from 'class-validator';

enum ScreenshotType {
  VIDEO = 'video',
  CHANNEL = 'channel',
  ALL = 'all',
  PLAYLIST = 'playlist',
}

@InputType()
export class GetScreenshotsInput {
  @Field(() => String)
  @IsEnum(ScreenshotType)
  type: ScreenshotType;

  @Field(() => [Number], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @ValidateIf((o) => o.type === ScreenshotType.CHANNEL)
  channelIds?: number[];

  @Field(() => Number, { nullable: true })
  @IsOptional()
  @IsNumber()
  @ValidateIf((o) => o.type === ScreenshotType.PLAYLIST)
  playlistId?: number;

  @Field(() => [Number], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @ValidateIf((o) => o.type === ScreenshotType.VIDEO)
  videoIds?: number[];
}
