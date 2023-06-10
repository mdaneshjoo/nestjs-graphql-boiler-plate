import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import AppModule from './app.module';
import { AppConfigService } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          imgSrc: [
            "'self'",
            'data:',
            'apollo-server-landing-page.cdn.apollographql.com',
          ],
          scriptSrc: ["'self'", "https: 'unsafe-inline'"],
          manifestSrc: [
            "'self'",
            'apollo-server-landing-page.cdn.apollographql.com',
          ],
          frameSrc: ["'self'", 'sandbox.embed.apollographql.com'],
        },
      },
    }),
  );
  const appConfig = app.get<AppConfigService>(AppConfigService);

  await app.listen(appConfig.PORT);
}

bootstrap();
