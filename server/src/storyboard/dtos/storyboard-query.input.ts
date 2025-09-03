import { InputType, Field } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class StoryboardQueryInput {
  @Field()
  @IsNumber()
  channelId: number;
}
