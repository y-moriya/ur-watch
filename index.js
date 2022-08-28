// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token, urUrl, apiUrl, channelId, schedule } = require('./config.json');
const fetch = require('node-fetch');
const cron = require('node-cron');
const { logger } = require('./logger.js');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// When the client is ready, run this code (only once)
client.once('ready', async () => {
  logger.info('Ready!');
  const channel = await client.channels.fetch(channelId);
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
        channel.send(mes);
      }
    } else {
      logger.info('空室情報はありませんでした。')
    }
  });
});

// Login to Discord with your client's token
client.login(token);