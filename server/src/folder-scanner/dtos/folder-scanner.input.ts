import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsArray } from 'class-validator';

@InputType()
export class FolderScannerInput {
  @Field()
  @IsString()
  path: string;

  @Field()
  @IsString()
  structure: string;

  @Field(() => [String])
  @IsArray()
  @IsString({ each: true })
  ignoreDirs: string[];
}
