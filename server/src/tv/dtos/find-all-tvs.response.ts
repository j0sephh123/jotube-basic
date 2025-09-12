import { ObjectType, Field } from '@nestjs/graphql';
import { ExtendedTv } from './extended-tv.model';

@ObjectType()
export class FindAllTvsResponse {
  @Field(() => [ExtendedTv])
  tvs: ExtendedTv[];

  @Field()
  totalCount: number;

  @Field()
  message: string;
}
