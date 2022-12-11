import { Module } from '@nestjs/common';

import { configureEnvModule } from './configs/environment.configuration';
import { ClientModule } from './modules/client/client.module';

@Module({
  imports: [configureEnvModule(), ClientModule],
})
export class AppModule {}
