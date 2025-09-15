import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class FinishProcessEpisodeResponse {
  @Field(() => Number)
  id: number;

  @Field(() => String)
  identifier: string;

  @Field(() => String)
  artifact: string;
}
