import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ProcessingReadyUploadsResponse {
  @Field(() => Int)
  count: number;
}
