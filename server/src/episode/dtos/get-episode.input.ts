import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class GetEpisodeInput {
  @Field(() => Int)
  @IsNumber()
  id: number;
}
