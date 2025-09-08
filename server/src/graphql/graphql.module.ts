import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { SearchModule } from '../search/search.module';
import { ScreenshotsApiModule } from '../screenshots/api/screenshots-api.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      playground: true,
      introspection: true,
      sortSchema: true,
    }),
    SearchModule,
    ScreenshotsApiModule,
  ],
  providers: [],
})
export class AppGraphQLModule {}
