import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SearchVideoResult {
  @Field()
  title: string;

  @Field()
  ytId: string;

  @Field()
  src: string;

  @Field()
  channelYtId: string;

  @Field()
  type: string;
}

@ObjectType()
export class SearchChannelResult {
  @Field()
  title: string;

  @Field()
  ytId: string;

  @Field()
  src: string;

  @Field()
  type: string;
}

export type SearchResult = SearchVideoResult | SearchChannelResult;
