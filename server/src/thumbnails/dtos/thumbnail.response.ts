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
export class ThumbnailByVideoIdResponse {
  @Field(() => String)
  createdAt: string;

  @Field(() => Number)
  id: number;

  @Field(() => Number)
  perRow: number;

  @Field(() => String)
  updatedAt: string;

  @Field(() => Number)
  uploadsVideoId: number;

  @Field(() => Number)
  totalSeconds: number;

  @Field(() => UploadsVideoResponse)
  uploadsVideo: UploadsVideoResponse;

  @Field(() => Number)
  thumbnailsCount: number;
}
