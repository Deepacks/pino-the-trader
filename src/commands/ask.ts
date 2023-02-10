import { SlashCommandBuilder } from 'discord.js';

const data = new SlashCommandBuilder()
  .setName('ask')
  .setDescription('Chiedi a Pino ciò che vuoi sapere')
  .addStringOption((option) =>
    option
      .setName('text')
      .setDescription('Ciò che vuoi dire a Pino')
      .setRequired(true),
  );

export default data;
