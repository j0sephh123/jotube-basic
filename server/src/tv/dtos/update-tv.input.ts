import { InputType, Field, Int } from '@nestjs/graphql';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

@InputType()
export class UpdateTvInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  identifier: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  title: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  duration?: number;
}
