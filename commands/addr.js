const { SlashCommandBuilder } = require('@discordjs/builders');
const { ignoreRoom } = require('../lib/room');
const { logger } = require('../logger');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addr')
		.setDescription('Set ignore room to database')
		.addStringOption(option => option.setName('room_number').setDescription('Enter a ignore room number')),
	async execute(interaction) {
		await interaction.reply(`${room_number} を非表示リストに追加しました。`);
		// logger.info('execute');
		// const room_number = interaction.options.getString('room_number');
		// logger.info(room_number);
		// await ignoreRoom(room_number);
    // logger.info(`update ignores from command, set: ${room_number}`);
		// await interaction.reply(`${room_number} を非表示リストに追加しました。`);
	},
};