import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';

import { getEnvVar } from 'src/helpers/getEnvVar.helper';

@Injectable()
export class OpenAiClientService {
  public openAiClient: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
      apiKey: getEnvVar('openAiApiKey'),
    });

    this.openAiClient = new OpenAIApi(configuration);
  }
}
