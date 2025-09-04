import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Episode {
  @Field(() => ID)
  id: number;

  @Field()
  identifier: string;

  @Field()
  title: string;

  @Field()
  artifact: string;

  @Field({ nullable: true })
  publishedAt?: Date;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => ID)
  tvId: number;
}
