import { ObjectType, Field } from '@nestjs/graphql';
import { TvMessage } from './create-tv.response';
import { Tv } from './tv.model';

@ObjectType()
export class UpdateTvResponse {
  @Field(() => TvMessage)
  message: TvMessage;

  @Field(() => Tv, { nullable: true })
  tv?: Tv;
}
