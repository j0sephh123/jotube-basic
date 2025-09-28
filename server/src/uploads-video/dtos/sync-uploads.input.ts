import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNumber, IsArray } from 'class-validator';

@InputType()
export class SyncUploadsInput {
  @Field(() => [Int])
  @IsArray()
  @IsNumber({}, { each: true })
  channelIds: number[];
}
