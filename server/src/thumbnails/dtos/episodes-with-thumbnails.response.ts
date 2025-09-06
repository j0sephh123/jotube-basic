import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EpisodesWithThumbnailsResponse {
  @Field()
  tvIdentifier: string;

  @Field()
  episodeIdentifier: string;
}
