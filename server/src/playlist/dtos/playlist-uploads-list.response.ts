import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class PlaylistUploadsListUploadResponse {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  ytId: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  publishedAt: string;

  @Field(() => String)
  channelTitle: string;

  @Field(() => String)
  ytChannelId: string;

  @Field(() => String)
  src: string;
}

@ObjectType()
export class PlaylistUploadsListResponse {
  @Field(() => [PlaylistUploadsListUploadResponse])
  uploads: PlaylistUploadsListUploadResponse[];
}
