import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UploadsWithThumbnailsResponse {
  @Field()
  ytChannelId: string;

  @Field()
  ytVideoId: string;

  @Field()
  channelTitle: string;

  @Field()
  channelId: number;

  @Field()
  videoId: number;
}
