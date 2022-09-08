const { logger } = require('../logger');
const { channelId, schedule } = require('../config.json');
const cron = require('node-cron');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		logger.info(`Ready! Logged in as ${client.user.tag}`);
    cron.schedule(schedule, async () => {
      const params = new URLSearchParams();
      params.append('shisya', '80');
      params.append('danchi', '284');
      params.append('shikibetu', '0');
      params.append('pageIndex', '0');
      params.append('orderByField', '0');
      params.append('orderBySort', '0');
      const opt = { method: 'POST', body: params };
      const response = await fetch(apiUrl, opt);
      const json = await response.text();
      const rooms = JSON.parse(json);
      if (rooms && rooms.length > 0) {
        for (const r of rooms) {
          const mes = `${r.name} ${r.madori}\n${urUrl+r.roomDetailLink}`;
          logger.info(mes);
          const channel = await client.channels.fetch(channelId);
          channel.send(mes);
        }
      } else {
        logger.info('空室情報はありませんでした。')
      }
    });
	},
};