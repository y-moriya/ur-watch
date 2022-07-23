// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token, riversideUrl, channelId, schedule } = require('./config.json');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const cron = require('node-cron');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// When the client is ready, run this code (only once)
client.once('ready', async () => {
	console.log('Ready!');
  const channel = await client.channels.fetch(channelId);
  cron.schedule(schedule, async () => {
    const response = await fetch(riversideUrl);
    const body = await response.text();
    const $ = cheerio.load(body);
    // 空室がない場合は dn クラスがある
    const hasEmptyRoom = !$('.js-no-room-show').attr('class').includes('dn');
    if (hasEmptyRoom) {
      channel.send(`空室情報が見つかりました: ${riversideUrl}`);
    }
  });
});

// Login to Discord with your client's token
client.login(token);