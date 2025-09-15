import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FinishProcessEpisodeInput {
  @Field(() => String)
  tvIdentifier: string;

  @Field(() => String)
  episodeIdentifier: string;

  @Field(() => [Number])
  savedSeconds: number[];
}
