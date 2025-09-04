import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsOptional, IsNumber } from 'class-validator';

@InputType()
export class UpdateTvInput {
  @Field()
  @IsString()
  identifier: string;

  @Field()
  @IsString()
  title: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  duration?: number;
}
