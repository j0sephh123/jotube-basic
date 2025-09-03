import { InputType, Field } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class GetVideoByYtIdInput {
  @Field()
  @IsString()
  ytId: string;

  @Field()
  @IsNumber()
  channelId: number;
}
