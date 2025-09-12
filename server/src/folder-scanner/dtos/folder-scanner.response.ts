import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class FileInfo {
  @Field()
  fileName: string;

  @Field()
  size: number;

  @Field()
  duration: number;

  @Field()
  format: string;
}

@ObjectType()
export class FolderScannerResponse {
  @Field(() => [FileInfo])
  files: FileInfo[];
}
