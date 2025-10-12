import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  IsEnum,
  IsInt,
  ValidateNested,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IdInput } from './uploads-list.input';

@InputType()
export class UploadsYearCountsInput {
  @Field(() => IdInput)
  @IsObject()
  @ValidateNested()
  @Type(() => IdInput)
  id: IdInput;

  @Field(() => String)
  @IsString()
  type: string;
}
