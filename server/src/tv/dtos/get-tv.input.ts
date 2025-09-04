import { InputType, Field, Float } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class GetTvInput {
  @Field(() => Float)
  @IsNumber()
  id: number;
}
