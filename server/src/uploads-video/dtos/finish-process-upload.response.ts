import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class FinishProcessUploadResponse {
  @Field(() => Number)
  id: number;

  @Field(() => String)
  ytId: string;

  @Field(() => String)
  artifact: string;
}
