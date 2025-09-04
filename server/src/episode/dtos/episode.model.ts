import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Tv } from 'src/tv/dtos/tv.model';

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

  @Field(() => Tv, { nullable: true })
  tv?: Tv;
}
