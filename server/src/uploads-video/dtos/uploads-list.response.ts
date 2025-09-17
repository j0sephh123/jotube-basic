import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UploadsListUploadResponse {
  @Field(() => Int)
  id: number;

  @Field()
  ytId: string;

  @Field()
  title: string;

  @Field()
  publishedAt: string;

  @Field()
  src: string;

  @Field(() => Int)
  channelId: number;

  @Field()
  channelTitle: string;

  @Field()
  ytChannelId: string;

  @Field(() => String, { nullable: true })
  dateAdded?: string;

  @Field(() => Int, { nullable: true })
  screenshotCount?: number;
}

export type UploadsListResponse = UploadsListUploadResponse[];
