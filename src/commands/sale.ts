import { SlashCommandBuilder } from 'discord.js';

const data = new SlashCommandBuilder()
  .setName('sale')
  .setDescription('Aggiungi un articolo in vendita');

export default data;
