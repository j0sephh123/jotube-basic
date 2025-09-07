import { InputType, Field, Int } from '@nestjs/graphql';
import {
  IsArray,
  IsNumber,
  IsEnum,
  IsOptional,
  ValidateIf,
} from 'class-validator';
import { IdType } from '../../uploads-video/dtos/uploads-list.input';

export { IdType };

@InputType()
export class UploadsWithThumbnailsInput {
  @Field(() => IdType)
  @IsEnum(IdType)
  idType: IdType;

  @Field(() => [Number], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @ValidateIf((o) => o.idType === IdType.CHANNEL)
  channelIds?: number[];

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @ValidateIf((o) => o.idType === IdType.PLAYLIST)
  playlistId?: number;
}
