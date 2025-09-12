import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class GetAllEpisodesInput {
  @Field(() => [Int], { nullable: true })
  tvIds?: number[];

  @Field()
  artifact: string;
}
