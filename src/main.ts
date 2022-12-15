import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('discord');
  app.use(cookieParser());

  await app.listen(3002, '0.0.0.0');
}
bootstrap();
