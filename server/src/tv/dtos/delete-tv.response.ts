import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class DeleteTvResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;
}
