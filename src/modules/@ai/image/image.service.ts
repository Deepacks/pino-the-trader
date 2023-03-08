import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateImageRequest } from 'openai';

import { OpenAiService } from '../OpenAi.service';

@Injectable()
export class ImageService {
  constructor(private openAiService: OpenAiService) {}

  async generateImage(
    prompt: string,
    size: CreateImageRequest['size'] = '256x256',
  ): Promise<string> {
    if (!prompt) throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);

    try {
      const response = await this.openAiService.openAiApi.createImage({
        prompt,
        n: 1,
        size,
      });

      return response.data.data[0].url;
    } catch (e) {
      return 'Something went wrong';
    }
  }
}
