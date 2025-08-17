import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UploadResponse {
  @Field()
  createdAt: string;

  @Field()
  ytId: string;

  @Field(() => Int)
  id: number;

  @Field(() => Int, { nullable: true })
  duration: number | null;

  @Field()
  publishedAt: string;

  @Field()
  src: string;

  @Field()
  title: string;

  @Field()
  artifact: string;
}

@ObjectType()
export class UploadsChannelResponse {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  src: string;

  @Field()
  ytId: string;

  @Field(() => [UploadResponse])
  uploads: UploadResponse[];

  @Field(() => Int)
  totalUploads: number;
}

@ObjectType()
export class SavedUploadsResponse {
  @Field()
  ytChannelId: string;

  @Field(() => UploadsChannelResponse, { nullable: true })
  channel: UploadsChannelResponse | null;

  @Field(() => [UploadResponse])
  uploads: UploadResponse[];

  @Field(() => Int)
  totalUploads: number;
}
