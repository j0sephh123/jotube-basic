import { InputType, Field, registerEnumType, Int } from '@nestjs/graphql';
import {
  IsString,
  IsEnum,
  IsInt,
  ValidateNested,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum IdType {
  CHANNEL = 'channel',
  PLAYLIST = 'playlist',
}

registerEnumType(SortOrder, {
  name: 'SortOrder',
  description: 'Sort order for uploads list',
});

registerEnumType(IdType, {
  name: 'IdType',
  description: 'Type of ID for uploads list',
});

@InputType()
export class IdInput {
  @Field(() => IdType)
  @IsEnum(IdType)
  type: IdType;

  @Field(() => Int)
  @IsInt()
  value: number;
}

@InputType()
export class UploadsListInput {
  @Field(() => IdInput)
  @IsObject()
  @ValidateNested()
  @Type(() => IdInput)
  id: IdInput;

  @Field(() => SortOrder)
  @IsEnum(SortOrder)
  sortOrder: SortOrder;

  @Field(() => String)
  @IsString()
  type: string;

  @Field(() => Int)
  @IsInt()
  take: number;
}
