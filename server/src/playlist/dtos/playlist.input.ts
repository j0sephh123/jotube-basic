import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreatePlaylistInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;
}

@InputType()
export class UpdatePlaylistInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  name?: string;
}

@InputType()
export class UpdateChannelPlaylistInput {
  @Field(() => Int)
  channelId: number;

  @Field(() => Int, { nullable: true })
  playlistId: number | null;
}
