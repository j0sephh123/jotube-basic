import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { ViewType } from '../types';

registerEnumType(ViewType, {
  name: 'ViewType',
  description: 'Available view types for dashboard filtering',
});

@InputType()
export class FetchDashboardInput {
  @Field()
  page: number;

  @Field()
  sortOrder: 'asc' | 'desc';

  @Field({ nullable: true })
  min?: number;

  @Field({ nullable: true })
  max?: number;

  @Field({ nullable: true })
  defaultMin?: number;

  @Field({ nullable: true })
  defaultMax?: number;

  @Field()
  viewType: string;

  @Field({ nullable: true })
  year?: number;

  @Field({ nullable: true })
  month?: number;
}
