import { InputType, Field, Int } from '@nestjs/graphql';
import {
  IsNumber,
  IsNotEmpty,
  IsString,
  IsArray,
  IsOptional,
} from 'class-validator';

@InputType()
export class CreateEpisodesFromPathInput {
  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  tvId: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  path: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  structure: string;

  @Field(() => [String])
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  ignoreDirs: string[];
}
