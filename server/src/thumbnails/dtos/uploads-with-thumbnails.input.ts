import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsNumber } from 'class-validator';

@InputType()
export class UploadsWithThumbnailsInput {
  @Field(() => [Number])
  @IsArray()
  @IsNumber({}, { each: true })
  channelIds: number[];
}
