import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
class PlaylistInfo {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}

@ObjectType()
export class ChannelMetadataResponse {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  fetchedUntilEnd: boolean;

  @Field(() => Int)
  videoCount: number;

  @Field({ nullable: true })
  lastSyncedAt?: string;

  @Field(() => PlaylistInfo, { nullable: true })
  playlist?: PlaylistInfo;

  @Field(() => Int)
  videoArtifactsCount: number;

  @Field(() => Int)
  savedArtifactsCount: number;

  @Field(() => Int)
  thumbnailArtifactsCount: number;

  @Field(() => Int)
  screenshotArtifactsCount: number;

  @Field(() => Int)
  storyboardArtifactsCount: number;
}
