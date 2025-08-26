import { ObjectType, Field, Int } from '@nestjs/graphql';
import { DashboardChannel, DashboardVideo } from '../types';

@ObjectType()
export class DashboardPlaylistResponse {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}

@ObjectType()
export class FeaturedScreenshotResponse {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  second: number;

  @Field()
  ytVideoId: string;

  @Field()
  src: string;
}
@ObjectType()
export class DashboardChannelResponse implements DashboardChannel {
  @Field(() => Int)
  id: number;

  @Field()
  createdAt: Date;

  @Field()
  title: string;

  @Field()
  ytId: string;

  @Field()
  src: string;

  @Field({ nullable: true })
  lastSyncedAt: Date | null;

  @Field(() => Int)
  videoCount: number;

  @Field(() => Int)
  thumbnails: number;

  @Field(() => Int)
  saved: number;

  @Field(() => Int)
  defaults: number;

  @Field(() => Int)
  storyboard: number;

  @Field(() => Int)
  screenshotsCount: number;

  @Field(() => DashboardPlaylistResponse, { nullable: true })
  playlist: DashboardPlaylistResponse | null;

  @Field(() => [FeaturedScreenshotResponse])
  featuredScreenshots: FeaturedScreenshotResponse[];
}

@ObjectType()
export class ChannelsDashboardResponse {
  @Field(() => [DashboardChannelResponse])
  channels: DashboardChannelResponse[];

  @Field(() => Int)
  total: number;
}

@ObjectType()
export class DashboardVideoResponse implements DashboardVideo {
  @Field(() => Int)
  id: number;

  @Field()
  ytId: string;

  @Field()
  title: string;

  @Field()
  src: string;

  @Field(() => Int)
  channelId: number;

  @Field()
  channelTitle: string;

  @Field()
  channelYtId: string;

  @Field(() => Int)
  screenshotCount: number;

  @Field(() => [FeaturedScreenshotResponse])
  featuredScreenshots: FeaturedScreenshotResponse[];
}

@ObjectType()
export class VideosDashboardResponse {
  @Field(() => [DashboardVideoResponse])
  videos: DashboardVideoResponse[];

  @Field(() => Int)
  total: number;
}
