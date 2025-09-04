import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class DeleteEpisodeResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;
}
