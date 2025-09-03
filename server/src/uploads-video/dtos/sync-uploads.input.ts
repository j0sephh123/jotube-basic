import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class SyncUploadsInput {
  @Field(() => Int)
  @IsNumber()
  channelId: number;
}
