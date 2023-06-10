import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql/dist/interfaces/gql-module-options.interface';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import AppConfigService from '../app/app.config.service';

@Injectable()
export default class GraphqlConfigService
  implements GqlOptionsFactory<ApolloDriverConfig>
{
  constructor(private appConfigService: AppConfigService) {}

  createGqlOptions():
    | Promise<Omit<ApolloDriverConfig, 'driver'>>
    | Omit<ApolloDriverConfig, 'driver'> {
    return {
      playground: this.appConfigService.NODE_ENV === 'DEV',
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    };
  }
}
