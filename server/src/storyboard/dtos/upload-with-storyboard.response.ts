import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class StoryboardFragmentResponse {
  @Field(() => Int)
  fragments: number;

  @Field()
  url: string;
}

@ObjectType()
export class StoryboardChannelResponse {
  @Field(() => Int)
  id: number;
}

@ObjectType()
export class UploadWithStoryboardResponse {
  @Field(() => Int)
  id: number;

  @Field()
  ytId: string;

  @Field()
  title: string;

  @Field(() => StoryboardFragmentResponse)
  storyboard: StoryboardFragmentResponse;

  @Field(() => StoryboardChannelResponse)
  channel: StoryboardChannelResponse;
}
