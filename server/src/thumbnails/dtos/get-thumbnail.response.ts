import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ChannelResponse {
  @Field(() => Number)
  id: number;

  @Field(() => String)
  ytId: string;

  @Field(() => String)
  title: string;
}

@ObjectType()
export class UploadsVideoResponse {
  @Field(() => String)
  ytId: string;

  @Field(() => ChannelResponse)
  channel: ChannelResponse;
}

@ObjectType()
export class TVResponse {
  @Field(() => String)
  identifier: string;
}

@ObjectType()
export class EpisodeResponse {
  @Field(() => String)
  identifier: string;

  @Field(() => TVResponse)
  tv: TVResponse;
}

@ObjectType()
export class GetThumbnailResponse {
  @Field(() => String)
  createdAt: string;

  @Field(() => Number)
  id: number;

  @Field(() => Number)
  perRow: number;

  @Field(() => String)
  updatedAt: string;

  @Field(() => Number, { nullable: true })
  uploadsVideoId?: number;

  @Field(() => Number, { nullable: true })
  episodeId?: number;

  @Field(() => Number)
  totalSeconds: number;

  @Field(() => UploadsVideoResponse, { nullable: true })
  uploadsVideo?: UploadsVideoResponse;

  @Field(() => EpisodeResponse, { nullable: true })
  episode?: EpisodeResponse;

  @Field(() => Number)
  thumbnailsCount: number;
}
