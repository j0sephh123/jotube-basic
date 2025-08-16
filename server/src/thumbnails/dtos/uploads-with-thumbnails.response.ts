import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UploadsWithThumbnailsResponse {
  @Field()
  ytChannelId: string;

  @Field()
  ytVideoId: string;
}
