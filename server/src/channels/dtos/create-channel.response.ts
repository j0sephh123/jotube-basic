import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class CreateChannelResponse {
  @Field()
  success: boolean;

  @Field({ nullable: true })
  ytChannelId?: string;
}
