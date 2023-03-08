import { DynamicModule, Module } from '@nestjs/common';
import { ConfigurationParameters } from 'openai';

import { OpenAiService } from './OpenAi.service';
import { ImageModule } from './image/image.module';

@Module({})
export class OpenAiModule {
  static create(config: ConfigurationParameters): DynamicModule {
    return {
      module: OpenAiModule,
      imports: [ImageModule],
      providers: [
        { provide: 'OPENAI_CONFIG_OPTIONS', useValue: config },
        OpenAiService,
      ],
      exports: [OpenAiService],
      global: true,
    };
  }
}
