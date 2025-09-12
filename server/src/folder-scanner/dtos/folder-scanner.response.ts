import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class FileInfo {
  @Field()
  videoFileName: string;

  @Field()
  parentFolderName: string;

  @Field()
  size: number;

  @Field()
  duration: number;

  @Field()
  format: string;

  @Field()
  fullPath: string;
}

@ObjectType()
export class FolderScannerResponse {
  @Field(() => [FileInfo])
  files: FileInfo[];
}
