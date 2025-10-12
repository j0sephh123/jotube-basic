import { ObjectType, Field, Int } from '@nestjs/graphql';
import { FeaturedScreenshotResponse } from 'src/dashboard/dtos/dashboard.response';

@ObjectType()
export class PlaylistChannelResponse {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  ytId: string;
}

@ObjectType()
export class PlaylistChannelWithCountsResponse {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  ytId: string;

  @Field()
  src: string;

  @Field({ nullable: true })
  lastSyncedAt?: string;

  @Field(() => Int)
  videoCount: number;

  @Field(() => Int)
  totalVideos: number;

  @Field(() => Int)
  saved: number;

  @Field(() => Int)
  screenshotCount: number;

  @Field(() => Int)
  thumbnailCount: number;

  @Field(() => Int)
  storyboardCount: number;

  @Field(() => [FeaturedScreenshotResponse])
  featuredScreenshots: FeaturedScreenshotResponse[];

  @Field()
  createdAt: Date;

  @Field()
  fetchedUntilEnd: boolean;
}

@ObjectType()
export class PlaylistResponse {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;

  @Field(() => [PlaylistChannelResponse])
  channels: PlaylistChannelResponse[];
}

@ObjectType()
export class PlaylistDetailsResponse {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;

  @Field(() => [PlaylistChannelWithCountsResponse])
  channels: PlaylistChannelWithCountsResponse[];
}

@ObjectType()
export class CreatePlaylistResponse {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}

@ObjectType()
export class UpdatePlaylistResponse {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}

@ObjectType()
export class DeletePlaylistResponse {
  @Field()
  success: boolean;
}

@ObjectType()
export class UpdateChannelPlaylistResponse {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  ytId: string;

  @Field()
  src: string;

  @Field(() => Int)
  videoCount: number;

  @Field(() => Int, { nullable: true })
  playlistId: number | null;
}
