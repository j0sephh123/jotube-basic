import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class DeleteChannelResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;
}
