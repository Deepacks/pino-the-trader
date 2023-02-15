import { Injectable } from '@nestjs/common';

import { OpenAiService } from '../OpenAi.service';

@Injectable()
export class ImageService {
  constructor(private openAiService: OpenAiService) {}

  async generateImage(prompt: string): Promise<string> {
    try {
      const response = await this.openAiService.openAiApi.createImage({
        prompt: prompt,
        n: 1,
        size: '256x256',
      });

      return response.data.data[0].url;
    } catch (e) {
      return 'Something went wrong';
    }
  }
}
