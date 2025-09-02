import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { Phase } from '@prisma/client';

registerEnumType(Phase, {
  name: 'Phase',
  description: 'Processing phases for video uploads',
});

@ObjectType()
export class ChannelInfo {
  @Field()
  id: number;

  @Field()
  title: string;

  @Field()
  ytId: string;
}

@ObjectType()
export class UploadsVideoInfo {
  @Field()
  id: number;

  @Field()
  ytId: string;

  @Field()
  title: string;

  @Field(() => ChannelInfo)
  channel: ChannelInfo;
}

@ObjectType()
export class ProcessingPhaseResponse {
  @Field()
  id: number;

  @Field()
  uploadsVideoId: number;

  @Field(() => Phase)
  phase: Phase;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  endedAt?: Date;

  @Field(() => UploadsVideoInfo)
  uploadsVideo: UploadsVideoInfo;
}
