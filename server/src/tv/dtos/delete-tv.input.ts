import { InputType, Field, Float } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class DeleteTvInput {
  @Field(() => Float)
  @IsNumber()
  id: number;
}
