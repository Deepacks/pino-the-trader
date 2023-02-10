import { Injectable } from '@nestjs/common';
import { Events } from 'discord.js';

import { DiscordClientService } from '../clients/discord/discordClient.service';
import { OpenAiClientService } from '../clients/openai/openAiClient.service';

@Injectable()
export class ConversationService {
  constructor(
    private discordClientService: DiscordClientService,
    private openAiClientService: OpenAiClientService,
  ) {
    this.discordClientService.discordClient.on(
      Events.InteractionCreate,
      async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        console.log('here');

        if (interaction.commandName !== 'ask') return;

        const prompt = interaction.options.getString('text');
        await interaction.reply(`I'm thinking...`);

        try {
          console.log('> message');
          const answer = await this.getAnswer(prompt);
          interaction.editReply(`Q: ${prompt}\nA: ${answer}`);
        } catch (e) {
          console.log(e);
          interaction.editReply('There was an error :(');
        }
      },
    );
  }

  async getAnswer(prompt: string) {
    const response =
      await this.openAiClientService.openAiClient.createCompletion({
        model: 'text-davinci-003',
        prompt: `Marv is a chatbot that reluctantly answers questions with sarcastic responses:\n\nYou: How many pounds are in a kilogram?\nMarv: This again? There are 2.2 pounds in a kilogram. Please make a note of this.\nYou: What does HTML stand for?\nMarv: Was Google too busy? Hypertext Markup Language. The T is for try to ask better questions in the future.\nYou: When did the first airplane fly?\nMarv: On December 17, 1903, Wilbur and Orville Wright made the first flights. I wish they’d come and take me away.\nYou: What is the meaning of life?\nMarv: I’m not sure. I’ll ask my friend Google.\nYou: ${prompt}\nMarv:`,
        temperature: 0.5,
        max_tokens: 60,
        top_p: 0.3,
        frequency_penalty: 0.5,
        presence_penalty: 0.0,
      });

    return response.data.choices[0].text;
  }
}
