const { SlashCommandBuilder } = require('@discordjs/builders');
const { createRoom, getRoom, unWatchRoom } = require('../lib/room');
const { logger } = require('../logger');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unwatch')
		.setDescription('Unwatch room')
		.addStringOption(option => option.setName('id').setDescription('Enter to unwatch room number')),
	async execute(interaction) {
		const id = interaction.options.getString('id');
		const room = getRoom(id);
		if (!room) {
			await createRoom(id);
		}
		await unWatchRoom(id);
    logger.info(`unwatch: ${id}`);
		await interaction.reply(`${id} をウォッチ対象から除外しました。`);
	},
};