import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class SaveUploadItemInput {
  @Field()
  @IsString()
  ytVideoId: string;

  @Field()
  @IsString()
  ytChannelId: string;
}

@InputType()
export class SaveUploadInput {
  @Field(() => [SaveUploadItemInput])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SaveUploadItemInput)
  uploads: SaveUploadItemInput[];
}
