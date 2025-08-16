import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class GetSlidesResponse {
  @Field()
  ytVideoId: string;

  @Field()
  id: number;

  @Field()
  second: number;

  @Field()
  src: string;

  @Field({ nullable: true })
  isFav: boolean | null;
}
