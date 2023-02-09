import { SlashCommandBuilder } from 'discord.js';

const data = new SlashCommandBuilder()
  .setName('text-to-image')
  .setDescription("Generera un'immagine a partire da una descrizione")
  .addStringOption((option) =>
    option
      .setName('text')
      .setDescription("Il testo che verrà usato per generare l'immagine")
      .setRequired(true),
  );

export default data;
