import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { IsString, IsEnum } from 'class-validator';

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
  @Field()
  @IsString()
  ytChannelId: string;

  @Field(() => SortOrder)
  @IsEnum(SortOrder)
  sortOrder: SortOrder;

  @Field(() => String)
  @IsString()
  type: string;
}
