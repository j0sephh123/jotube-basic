import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UploadsYearCountResponse {
  @Field(() => Int)
  year: number;

  @Field(() => Int)
  count: number;
}

export type UploadsYearCountsResponse = UploadsYearCountResponse[];
