import { IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

export enum DeleteType {
  VIDEO = 'video',
  SAVED_SCREENSHOTS = 'saved_screenshots',
  ALL_SCREENSHOTS = 'all_screenshots',
  THUMBNAILS = 'thumbnails',
}

registerEnumType(DeleteType, {
  name: 'DeleteType',
  description: 'Types of files/directories that can be deleted',
});

@InputType()
export class DeleteFileDto {
  @Field()
  @ApiProperty({
    description: 'YouTube Channel ID',
    example: 'UC123456789',
  })
  @IsString()
  ytChannelId: string;

  @Field()
  @ApiProperty({
    description: 'YouTube Video ID',
    example: 'dQw4w9WgXcQ',
  })
  @IsString()
  ytVideoId: string;

  @Field(() => DeleteType)
  @ApiProperty({
    description: 'Type of file/directory to delete',
    enum: DeleteType,
    example: DeleteType.VIDEO,
  })
  @IsEnum(DeleteType)
  deleteType: DeleteType;
}

@ObjectType()
export class DeleteFileResponse {
  @Field()
  success: boolean;

  @Field({ nullable: true })
  message?: string;
}
