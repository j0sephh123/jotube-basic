import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class StatisticsCountsResponse {
  @Field(() => Number)
  totalScreenshots: number;

  @Field(() => Number)
  totalThumbnails: number;

  @Field(() => Number)
  totalSaved: number;

  @Field(() => Number)
  totalStoryboards: number;
}
