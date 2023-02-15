import { Inject, Injectable } from '@nestjs/common';
import { Configuration, ConfigurationParameters, OpenAIApi } from 'openai';

@Injectable()
export class OpenAiService {
  private _openAiApi: OpenAIApi;

  public get openAiApi() {
    return this._openAiApi;
  }

  constructor(
    @Inject('OPENAI_CONFIG_OPTIONS')
    private readonly _config: ConfigurationParameters,
  ) {
    const configuration = new Configuration(this._config);

    this._openAiApi = new OpenAIApi(configuration);
  }
}
