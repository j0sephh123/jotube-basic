import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class Tv {
  @Field(() => ID)
  id: number;

  @Field()
  identifier: string;

  @Field()
  title: string;

  @Field(() => Int, { nullable: true })
  duration?: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
