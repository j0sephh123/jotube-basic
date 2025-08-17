import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class DeleteUploadsResponse {
  @Field(() => Boolean)
  success: boolean;
}
