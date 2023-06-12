import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleOptions,
  TypeOrmOptionsFactory,
} from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

@Injectable()
export default class PostgresConfigService implements TypeOrmOptionsFactory {
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
    return true;
  }

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.HOST,
      port: this.PORT,
      username: this.USERNAME,
      password: this.PASSWORD,
      database: this.NAME,
      synchronize: this.SYNC,
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrations: ['db/migrations/*{.ts,.js}'],
      autoLoadEntities: true,
    };
  }
}
