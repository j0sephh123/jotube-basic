import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CleanShortUploadsResponse {
  @Field(() => Int)
  deletedCount: number;
}
