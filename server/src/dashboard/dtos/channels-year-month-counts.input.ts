import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class ChannelsYearMonthCountsInput {
  @Field(() => String)
  @IsString()
  viewType: string;
}
