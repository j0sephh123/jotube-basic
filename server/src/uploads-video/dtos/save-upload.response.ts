import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SaveUploadResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;
}
