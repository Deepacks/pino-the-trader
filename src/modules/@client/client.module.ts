import { ClientService } from '@discord-nestjs/core/dist/services/client.service';
import { DynamicModule, Module } from '@nestjs/common';

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
