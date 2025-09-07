import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsNumber } from 'class-validator';

@InputType()
export class StoryboardQueryInput {
  @Field(() => [Number], { nullable: true })
  @IsArray()
  @IsNumber({}, { each: true })
  channelIds: number[];
}
