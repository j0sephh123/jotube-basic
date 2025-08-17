import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsArray } from 'class-validator';

@InputType()
export class SavedUploadsInput {
  @Field(() => [String])
  @IsArray()
  @IsString({ each: true })
  ytChannelIds: string[];
}
