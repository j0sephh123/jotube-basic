import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ScreenshotsCountsResponse {
  @Field(() => String)
  month: string;

  @Field(() => Number)
  count: number;
}

@ObjectType()
export class ScreenshotsResponse {
  @Field(() => [ScreenshotsCountsResponse])
  data: ScreenshotsCountsResponse[];
}
