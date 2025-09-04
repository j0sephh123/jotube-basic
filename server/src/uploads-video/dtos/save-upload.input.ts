import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsArray } from 'class-validator';

@InputType()
export class SaveUploadInput {
  @Field(() => [String])
  @IsArray()
  @IsString({ each: true })
  uploads: string[];
}
