import { InputType, Field, Int } from '@nestjs/graphql';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsNotEmpty,
  MinLength,
  IsDateString,
} from 'class-validator';

@InputType()
export class CreateEpisodeInput {
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

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  publishedAt?: string;

  @Field(() => Int)
  @IsNumber()
  tvId: number;
}
