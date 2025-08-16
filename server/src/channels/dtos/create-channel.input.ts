import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateChannelInput {
  @Field()
  @IsString()
  ytVideoId: string;
}
