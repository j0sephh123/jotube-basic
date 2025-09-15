import { InputType, Field } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class GetThumbnailInput {
  @Field(() => Number)
  @IsNumber()
  videoId: number;

  @Field(() => String)
  @IsString()
  type: string;
}
