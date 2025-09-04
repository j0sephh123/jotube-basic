import { InputType, Field } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class CleanShortUploadsInput {
  @Field()
  @IsNumber()
  channelId: number;
}
