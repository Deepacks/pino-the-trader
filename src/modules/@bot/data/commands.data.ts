import { SlashCommandBuilder } from 'discord.js';

export const commandsData = {
  textToImage: {
    name: 'text-to-image',
    description: 'Generate an image from a text prompt',
    data: new SlashCommandBuilder()
      .setName('text-to-image')
      .setDescription('Generate an image from a text prompt')
      .addStringOption((option) =>
        option
          .setName('text')
          .setDescription('The description of the image')
          .setRequired(true),
      ),
  },
  ask: {
    name: 'ask',
    description: 'Ask, and it will be given to you',
    data: new SlashCommandBuilder()
      .setName('ask')
      .setDescription('Ask, and it will be given to you')
      .addStringOption((option) =>
        option
          .setName('text')
          .setDescription('What you feel like saying')
          .setRequired(true),
      ),
  },
};
