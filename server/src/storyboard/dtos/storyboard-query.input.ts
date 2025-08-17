import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class StoryboardQueryInput {
  @Field()
  @IsString()
  ytChannelId: string;
}
