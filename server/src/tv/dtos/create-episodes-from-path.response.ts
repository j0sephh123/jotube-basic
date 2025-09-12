import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CreateEpisodesFromPathResponse {
  @Field(() => Int)
  episodesCreated: number;

  @Field()
  message: string;
}
