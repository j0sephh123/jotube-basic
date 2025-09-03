import { InputType, Field, registerEnumType, Int } from '@nestjs/graphql';
import { IsString, IsEnum, IsInt } from 'class-validator';

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(SortOrder, {
  name: 'SortOrder',
  description: 'Sort order for uploads list',
});

@InputType()
export class UploadsListInput {
  @Field(() => Int)
  @IsInt()
  channelId: number;

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
