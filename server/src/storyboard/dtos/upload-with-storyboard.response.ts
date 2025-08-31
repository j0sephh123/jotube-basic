import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class StoryboardFragmentResponse {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  fragments: number;

  @Field()
  url: string;
}

@ObjectType()
export class StoryboardChannelResponse {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  src: string;

  @Field()
  ytId: string;
}

@ObjectType()
export class UploadWithStoryboardResponse {
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

  @Field(() => Int)
  channelId: number;

  @Field({ nullable: true })
  nextPageToken: string | null;

  @Field(() => Int, { nullable: true })
  duration: number | null;

  @Field()
  artifact: string;

  @Field(() => StoryboardFragmentResponse)
  storyboard: StoryboardFragmentResponse;

  @Field(() => StoryboardChannelResponse)
  channel: StoryboardChannelResponse;
}
