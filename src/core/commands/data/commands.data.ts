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
}
