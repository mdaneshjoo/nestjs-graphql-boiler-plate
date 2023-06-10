import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import AppModule from './app.module';
import { AppConfigService } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());
  const appConfig = app.get<AppConfigService>(AppConfigService);

  await app.listen(appConfig.PORT);
}

bootstrap();
