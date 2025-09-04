import { InputType, Field } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class FetchUploadsInput {
  @Field()
  @IsNumber()
  channelId: number;
}
