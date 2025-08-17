import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class FetchUploadsResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;

  @Field(() => [String], { nullable: true })
  uploadIds?: string[];
}
