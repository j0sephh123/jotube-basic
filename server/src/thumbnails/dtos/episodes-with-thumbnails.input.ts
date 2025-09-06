import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class EpisodesWithThumbnailsInput {
  @Field(() => [Number])
  episodeIds: number[];
}
