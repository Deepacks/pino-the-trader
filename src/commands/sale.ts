import {
  CacheType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js';

const data = new SlashCommandBuilder()
  .setName('sale')
  .setDescription('Aggiungi un articolo in vendita');

const execute = async (interaction: ChatInputCommandInteraction<CacheType>) => {
  const exampleEmbed = new EmbedBuilder()
    .setColor(0xff00ff)
    .setAuthor({ name: `50€ - ${interaction.user.username}` })
    .setTitle('Trust GXT 711 Dominus')
    .setURL(
      'https://www.amazon.it/Trust-Scrivania-Gaming-Ottimali-Prestazioni/dp/B07H7VX718/ref=sr_1_9?__mk_it_IT=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=3UVJPQSQT27TC&keywords=scrivania+gaming&qid=1670791693&sprefi',
    )
    .setDescription(
      'Tavolo da gaming 4k 60fps hdr1000 no-flicker g-sync a 3 livelli di potenza, con manopole riscaldate. Set di batterie non incluso',
    )
    .setImage('https://m.media-amazon.com/images/I/81Jk1clmhlL._AC_SX679_.jpg')
    .setTimestamp()
    .setFooter({
      text: 'Come nuovo',
      iconURL: 'https://cdn-icons-png.flaticon.com/512/179/179452.png',
    });

  await interaction.reply({ embeds: [exampleEmbed] });
};

export { data, execute };
