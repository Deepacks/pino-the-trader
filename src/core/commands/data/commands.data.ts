import { SlashCommandBuilder } from 'discord.js'

export const commandsData = {
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
  textToImage: {
    name: 'text-to-image',
    description: 'Convert a text into an image',
    data: new SlashCommandBuilder()
      .setName('text-to-image')
      .setDescription('Convert a text into an image')
      .addStringOption((option) =>
        option
          .setName('text')
          .setDescription('The image prompt')
          .setRequired(true),
      ),
  },
}
