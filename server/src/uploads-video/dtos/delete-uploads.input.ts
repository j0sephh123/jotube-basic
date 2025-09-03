import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsArray, ArrayNotEmpty, ArrayUnique } from 'class-validator';

@InputType()
export class DeleteUploadsInput {
  @Field()
  @IsString()
  ytChannelId: string;

  @Field(() => [String])
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsString({ each: true })
  ytVideoIds: string[];
}
