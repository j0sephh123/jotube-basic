import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FetchVideosDashboardInput {
  @Field({ nullable: true })
  sortOrder?: 'asc' | 'desc';

  @Field({ nullable: true })
  screenshotMin?: number;

  @Field({ nullable: true })
  screenshotMax?: number;
}
