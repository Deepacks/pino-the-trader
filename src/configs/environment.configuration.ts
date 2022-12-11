import { DynamicModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

export const configureEnvModule: () => DynamicModule = () =>
  ConfigModule.forRoot({ isGlobal: true });
