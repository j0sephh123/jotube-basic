import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ChannelsYearMonthCountResponse {
  @Field(() => Int)
  year: number;

  @Field(() => Int)
  month: number;

  @Field(() => Int)
  count: number;
}

export type ChannelsYearMonthCountsResponse = ChannelsYearMonthCountResponse[];
