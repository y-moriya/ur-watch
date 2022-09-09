const { SlashCommandBuilder } = require('@discordjs/builders');
const { watchRoom } = require('../lib/room');
const { logger } = require('../logger');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('watch')
		.setDescription('watch room vacancy')
		.addStringOption(option => option.setName('id').setDescription('Enter to watch room number')),
	async execute(interaction) {
		const id = interaction.options.getString('id');
		await watchRoom(id);
    logger.info(`watch: ${id}`);
		await interaction.reply(`${id} をウォッチします。`);
	},
};