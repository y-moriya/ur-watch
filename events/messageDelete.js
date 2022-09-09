const { unWatchRoom } = require('../lib/room');
const { logger } = require('../logger');

module.exports = {
	name: 'messageDelete',
	async execute(message) {
    const match = message.content.match(/JKSS=(\d+)/);
    if (match) {
      const id = match[1];
      await unWatchRoom(id);
      logger.info(`${id} をウォッチ対象から除外しました。`);
    }
	},
};