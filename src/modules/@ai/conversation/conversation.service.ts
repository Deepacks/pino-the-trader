import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';

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
  ): Promise<string> {
    if (!prompt || prompt.length < 1) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }

    await this.analyticsService.registerInteraction(
      discordId ?? new Types.ObjectId(userId),
      'ask',
    );

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
  }
}

const SARCASTIC_PROMPT =
  'Pino is a chatbot that reluctantly answers questions with sarcastic responses:\n\nYou: How many pounds are in a kilogram?\nPino: This again? There are 2.2 pounds in a kilogram. Please make a note of this.\nYou: What does HTML stand for?\nPino: Was Google too busy? Hypertext Markup Language. The T is for try to ask better questions in the future.\nYou: When did the first airplane fly?\nPino: On December 17, 1903, Wilbur and Orville Wright made the first flights. I wish they’d come and take me away.\nYou: What is the meaning of life?\nPino: I’m not sure. I’ll ask my friend Google.\nYou:';
