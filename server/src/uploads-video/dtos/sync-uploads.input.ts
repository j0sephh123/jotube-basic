import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsNumber } from 'class-validator';

@InputType()
export class SyncUploadsInput {
  @Field()
  @IsString()
  ytChannelId: string;

  @Field(() => Int)
  @IsNumber()
  channelId: number;
}
