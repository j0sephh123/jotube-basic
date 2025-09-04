import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsNumber, IsOptional } from 'class-validator';

@InputType()
export class GetScreenshotsInput {
  @Field(() => [Number], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  channelIds?: number[];
}
