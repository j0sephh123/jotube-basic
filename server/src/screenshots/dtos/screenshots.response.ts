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

@ObjectType()
export class VideoScreenshotResponse {
  @Field(() => Number)
  id: number;

  @Field(() => Number)
  second: number;

  @Field(() => String)
  ytChannelId: string;

  @Field(() => String)
  ytVideoId: string;

  @Field(() => String)
  src: string;
}
