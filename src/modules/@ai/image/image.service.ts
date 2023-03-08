import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateImageRequest } from 'openai';
import { Types } from 'mongoose';

import { OpenAiService } from '../OpenAi.service';
import { AnalyticsService } from 'src/modules/analytics/analytics.service';

@Injectable()
export class ImageService {
  constructor(
    private readonly openAiService: OpenAiService,
    private readonly analyticsService: AnalyticsService,
  ) {}

  async generateImage(
    { userId, discordId }: { userId?: string; discordId?: string },
    prompt: string,
    size: CreateImageRequest['size'] = '256x256',
  ): Promise<string> {
    if (!prompt) throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);

    await this.analyticsService.registerInteraction(
      new Types.ObjectId(discordId ?? userId),
      'text-to-image',
      !!discordId,
    );

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
