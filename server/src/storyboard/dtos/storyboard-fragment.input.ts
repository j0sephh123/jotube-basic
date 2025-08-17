import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class StoryboardFragmentInput {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  uploadsVideoId: number;

  @Field(() => Int)
  fragments: number;

  @Field()
  url: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}
