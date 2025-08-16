import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsString, IsOptional } from 'class-validator';

@InputType()
export class GetSlidesInput {
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  ytChannelIds?: string[];
}
