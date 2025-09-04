import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { Tv } from './tv.model';

export enum TvMessage {
  CREATED_SUCCESSFULLY = 'CREATED_SUCCESSFULLY',
  FAILED_TO_CREATE = 'FAILED_TO_CREATE',
  UPDATED_SUCCESSFULLY = 'UPDATED_SUCCESSFULLY',
  FAILED_TO_UPDATE = 'FAILED_TO_UPDATE',
}

registerEnumType(TvMessage, {
  name: 'TvMessage',
  description: 'Possible messages for TV operation responses',
});

@ObjectType()
export class CreateTvResponse {
  @Field(() => TvMessage)
  message: TvMessage;

  @Field(() => Tv, { nullable: true })
  tv?: Tv;
}
