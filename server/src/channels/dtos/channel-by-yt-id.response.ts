import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ChannelForPlaylistResponse {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;
}
