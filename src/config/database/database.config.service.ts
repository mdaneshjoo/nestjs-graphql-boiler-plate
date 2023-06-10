import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleOptions,
  TypeOrmOptionsFactory,
} from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

@Injectable()
export default class DatabaseConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  get HOST(): string {
    return this.configService.get<string>('DB.HOST');
  }

  get PORT(): number {
    return +this.configService.get<string>('DB.PORT');
  }

  get USERNAME(): string {
    return this.configService.get<string>('DB.USERNAME');
  }

  get PASSWORD(): string {
    return this.configService.get<string>('DB.PASSWORD');
  }

  get NAME(): string {
    return this.configService.get<string>('DB.NAME');
  }

  get SYNC(): boolean {
    return this.configService.get<string>('DB.SYNC') === 'true';
  }

  createTypeOrmOptions(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    connectionName?: string,
  ): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.HOST,
      port: this.PORT,
      username: this.USERNAME,
      password: this.PASSWORD,
      database: this.NAME,
      synchronize: this.SYNC,
      entities: ['dist/**/*.entity{.ts,.js}'],
      // charset: 'utf8mb4_unicode_ci',
      migrations: ['dist/db/migrations/*{.ts,.js}'],
      migrationsTableName: 'migrations',
      migrationsRun: false,
      // multipleStatements allows you to run multiply raw sql query in one query runner
      // multipleStatements: true,
      // cli: {
      //   migrationsDir: 'src/db/migrations',
      // },
    };
  }
}
