const { Client } = require('discord.js-selfbot-v13');
const { joinVoiceChannel } = require('@discordjs/voice');
const express = require("express");

const client = new Client();
const app = express();

// Express keep-alive
const listener = app.listen(process.env.PORT || 2000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
app.get('/', (req, res) => {
  res.send(`<body><center><h1>Bot 24H ON!</h1></center></body>`)
});

client.on('ready', async () => {
  console.log(`${client.user.username} is ready!`);

  // محاولة دخول الغرفة مرة وحدة فقط
  try {
    const channel = await client.channels.fetch(process.env.channel);
    joinVoiceChannel({
      channelId: channel.id,
      guildId: process.env.guild,
      selfMute: true,
      selfDeaf: true,
      adapterCreator: channel.guild.voiceAdapterCreator
    });
    console.log(`Joined voice channel ${channel.name}`);
  } catch (err) {
    console.error("Error joining VC:", err);
  }
});

client.login(process.env.token);
