import { InputType, Field } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class ChannelMetadataInput {
  @Field()
  @IsNumber()
  channelId: number;
}
