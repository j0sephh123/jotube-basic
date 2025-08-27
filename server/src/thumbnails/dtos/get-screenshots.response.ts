import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class GetScreenshotsResponse {
  @Field()
  ytVideoId: string;

  @Field()
  id: number;

  @Field()
  second: number;

  @Field()
  src: string;
}
