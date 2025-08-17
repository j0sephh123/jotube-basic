import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class StoryboardDataResponse {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  fragments: number;

  @Field()
  url: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}

@ObjectType()
export class UploadsVideoStoryboardResponse {
  @Field(() => Int)
  id: number;

  @Field()
  ytId: string;

  @Field()
  title: string;

  @Field()
  src: string;

  @Field()
  publishedAt: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;

  @Field(() => Int)
  channelId: number;

  @Field({ nullable: true })
  nextPageToken: string | null;

  @Field(() => Int, { nullable: true })
  duration: number | null;

  @Field()
  artifact: string;

  @Field(() => StoryboardDataResponse)
  storyboard: StoryboardDataResponse;
}
