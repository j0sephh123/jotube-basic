import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  IsOptional,
  IsNotEmpty,
  MinLength,
  IsDateString,
} from 'class-validator';

@InputType()
export class UpdateEpisodeInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  publishedAt?: string;
}
