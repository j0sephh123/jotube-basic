import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Tv } from './tv.model';

@ObjectType()
export class ExtendedTv extends Tv {
  @Field(() => Int)
  amountOfEpisodes: number;
}
