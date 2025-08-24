import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UploadsListUploadResponse {
  @Field()
  artifact: string;

  @Field(() => Int)
  channelId: number;

  @Field()
  createdAt: string;

  @Field(() => Int, { nullable: true })
  duration: number | null;

  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  nextPageToken: string | null;

  @Field()
  publishedAt: string;

  @Field()
  src: string;

  @Field()
  title: string;

  @Field()
  updatedAt: string;

  @Field()
  ytId: string;
}

@ObjectType()
export class UploadsListResponse {
  @Field(() => Int)
  id: number;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;

  @Field()
  title: string;

  @Field()
  ytId: string;

  @Field()
  src: string;

  @Field(() => Int)
  videoCount: number;

  @Field()
  fetchStartVideoId: string;

  @Field()
  fetchedUntilEnd: boolean;

  @Field({ nullable: true })
  lastSyncedAt: string | null;

  @Field(() => [UploadsListUploadResponse])
  uploads: UploadsListUploadResponse[];
}
