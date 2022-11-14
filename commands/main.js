const { SlashCommandBuilder } = require('@discordjs/builders');
const { main } = require('../lib/main');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('main')
		.setDescription('Execute main'),
	async execute(interaction) {
		await interaction.reply('start get rooms.');
        main(interaction.client);
	},
};