import { DynamicModule, Module } from '@nestjs/common';

import { ClientService } from './client.service';

@Module({})
export class ClientModule {
  static forRoot(): DynamicModule {
    return {
      module: ClientModule,
      providers: [ClientService],
      exports: [ClientService],
      global: true,
    };
  }
}
