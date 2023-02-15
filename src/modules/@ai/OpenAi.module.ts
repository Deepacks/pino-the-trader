import { DynamicModule, Module } from '@nestjs/common';
import { ConfigurationParameters } from 'openai';

import { OpenAiService } from './OpenAi.service';

@Module({})
export class OpenAiModule {
  static create(config: ConfigurationParameters): DynamicModule {
    return {
      module: OpenAiModule,
      providers: [
        { provide: 'OPENAI_CONFIG_OPTIONS', useValue: config },
        OpenAiService,
      ],
      exports: [OpenAiService],
      global: true,
    };
  }
}
