import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class GetTvInput {
  @Field(() => Int)
  @IsNumber()
  id: number;
}
