const { logger } = require('../logger');
const { schedule } = require('../config.json');
const cron = require('node-cron');
const { main } = require('../lib/main');

module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    logger.info(`Ready! Logged in as ${client.user.tag}`);
    cron.schedule(schedule, async () => {
      try {
        main(client);
      } catch (error) {
        logger.error(error);
      }
    });
  },
};
