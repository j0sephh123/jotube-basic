import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class SyncUploadsResponse {
  @Field(() => Int)
  count: number;
}
