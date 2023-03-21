import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

import { isDev } from './helpers/isDev.helper';
import { getEnvVar } from './helpers/getEnvVar.helper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    credentials: true,
    origin: isDev() ? 'http://localhost:3000' : getEnvVar('client'),
  });

  app.setGlobalPrefix('discord/api');
  app.use(cookieParser());

  await app.listen(3002, '0.0.0.0');
}
bootstrap();
