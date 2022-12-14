import { ConfigModule } from '@nestjs/config';

export const configureEnvModule = () =>
  ConfigModule.forRoot({ isGlobal: true });
