import { DynamicModule, Module } from '@nestjs/common';
import { ConfigurationParameters } from 'openai';

import { OpenAiService } from './OpenAi.service';
import { ImageModule } from './image/image.module';
import { ConversationModule } from './conversation/conversation.module';

@Module({})
export class OpenAiModule {
  static create(config: ConfigurationParameters): DynamicModule {
    return {
      module: OpenAiModule,
      imports: [ImageModule, ConversationModule],
      providers: [
        { provide: 'OPENAI_CONFIG_OPTIONS', useValue: config },
        OpenAiService,
      ],
      exports: [OpenAiService],
      global: true,
    };
  }
}
