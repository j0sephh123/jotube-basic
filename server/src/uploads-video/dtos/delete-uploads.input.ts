import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  IsArray,
  ArrayNotEmpty,
  ArrayUnique,
  IsNumber,
} from 'class-validator';

@InputType()
export class DeleteUploadsInput {
  @Field()
  @IsNumber()
  channelId: number;

  @Field(() => [String])
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsString({ each: true })
  ytVideoIds: string[];
}
