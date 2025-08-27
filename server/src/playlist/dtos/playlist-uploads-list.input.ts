import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsInt } from 'class-validator';

@InputType()
export class PlaylistUploadsListInput {
  @Field(() => Int)
  @IsInt()
  playlistId: number;

  @Field(() => String)
  @IsString()
  uploadsType: string;
}
