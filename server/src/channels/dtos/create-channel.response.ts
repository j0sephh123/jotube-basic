import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';

export enum ChannelMessage {
  INVALID_VIDEO_ID = 'INVALID_VIDEO_ID',
  ALREADY_EXISTS = 'ALREADY_EXISTS',
  CREATED_SUCCESSFULLY = 'CREATED_SUCCESSFULLY',
  FAILED_TO_CREATE = 'FAILED_TO_CREATE',
}

registerEnumType(ChannelMessage, {
  name: 'ChannelMessage',
  description: 'Possible messages for channel creation responses',
});

@ObjectType()
export class CreateChannelResponse {
  @Field(() => ChannelMessage)
  message: ChannelMessage;

  @Field({ nullable: true })
  ytChannelId?: string;
}
