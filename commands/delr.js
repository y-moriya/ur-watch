const { SlashCommandBuilder } = require('@discordjs/builders');
const { unIgnoreRoom } = require('../lib/room');
const { logger } = require('../logger');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('delr')
		.setDescription('unignore room to database')
		.addStringOption(option => option.setName('room_number').setDescription('Enter a unignore room number')),
	async execute(interaction) {
		const room_number = interaction.options.getString('room_number');
		await unIgnoreRoom(room_number);
    logger.info(`update ignores from command, unignore: ${room_number}`);
		await interaction.reply(`${room_number} を非表示リストから削除しました。`);
	},
};