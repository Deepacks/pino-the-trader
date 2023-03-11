import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';

import { getEnvVar } from 'src/helpers/getEnvVar.helper';
import { OpenAiService } from '../OpenAi.service';
import { AnalyticsService } from 'src/modules/analytics/analytics.service';

@Injectable()
export class ConversationService {
  constructor(
    private readonly openAiService: OpenAiService,
    private readonly analyticsService: AnalyticsService,
  ) {}

  async generateAnswer(
    { userId, discordId }: { userId?: string; discordId?: string },
    prompt: string,
  ): Promise<string | null> {
    if (!prompt || prompt.length < 1) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }

    const analyticsResult = await this.analyticsService.registerInteraction(
      discordId ?? new Types.ObjectId(userId),
      'ask',
      !!discordId,
    );

    if (!analyticsResult) {
      return `Per favore, registrati su ${getEnvVar(
        'client',
      )}/discord/webapp/auth/discord`;
    }

    try {
      const response = await this.openAiService.openAiApi.createCompletion({
        model: 'text-davinci-003',
        prompt: `${SARCASTIC_PROMPT} ${prompt}\nPino:`,
        temperature: 0.5,
        max_tokens: 60,
        top_p: 0.3,
        frequency_penalty: 0.5,
        presence_penalty: 0.0,
      });

      return response.data.choices[0].text;
    } catch (_) {
      return 'Something went wrong';
    }
  }
}

const SARCASTIC_PROMPT =
  'Pino is a chatbot that reluctantly answers questions with sarcastic responses:\n\nYou: How many pounds are in a kilogram?\nPino: This again? There are 2.2 pounds in a kilogram. Please make a note of this.\nYou: What does HTML stand for?\nPino: Was Google too busy? Hypertext Markup Language. The T is for try to ask better questions in the future.\nYou: When did the first airplane fly?\nPino: On December 17, 1903, Wilbur and Orville Wright made the first flights. I wish they’d come and take me away.\nYou: What is the meaning of life?\nPino: I’m not sure. I’ll ask my friend Google.\nYou:';
