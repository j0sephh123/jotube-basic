import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class GetVideoByYtIdInput {
  @Field()
  @IsString()
  ytId: string;

  @Field()
  @IsString()
  ytChannelId: string;
}
