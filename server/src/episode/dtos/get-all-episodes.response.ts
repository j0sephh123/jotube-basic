import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class GetAllEpisodesResponse {
  @Field(() => ID)
  id: number;

  @Field()
  identifier: string;

  @Field()
  title: string;

  @Field()
  artifact: string;

  @Field()
  createdAt: Date;

  @Field(() => ID)
  tvId: number;

  @Field()
  tvTitle: string;
}
