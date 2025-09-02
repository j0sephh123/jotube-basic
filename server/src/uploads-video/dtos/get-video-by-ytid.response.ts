import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class FileWithSizeResponse {
  @Field()
  name: string;

  @Field()
  sizeMB: number;
}

@ObjectType()
export class VideoByYtIdResponse {
  @Field()
  id: number;

  @Field()
  title: string;

  @Field()
  ytId: string;

  @Field()
  artifact: string;

  @Field()
  src: string;

  @Field()
  channelTitle: string;

  @Field()
  publishedAt: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;

  @Field(() => [FileWithSizeResponse])
  filesWithSize: FileWithSizeResponse[];
}
