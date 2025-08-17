import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class FetchUploadsInput {
  @Field()
  @IsString()
  ytChannelId: string;
}
