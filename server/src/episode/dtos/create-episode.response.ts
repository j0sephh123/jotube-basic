import { ObjectType, Field } from '@nestjs/graphql';
import { Episode } from './episode.model';

@ObjectType()
export class CreateEpisodeResponse {
  @Field(() => Episode, { nullable: true })
  episode?: Episode;

  @Field()
  message: string;
}
