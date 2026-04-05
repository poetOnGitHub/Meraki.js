require('dotenv').config();
const path = require('path');
const { Client, Intents } = require('discord.js');
const { SlashCreator, GatewayServer } = require('slash-create');

global.client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

require('./src/listenEvents');

// Load configuration from environment variables
client.config = {
    dsc: {
        id: process.env.DISCORD_APP_ID,
        token: process.env.DISCORD_TOKEN
    }
};

// Init Slash Creator
const creator = new SlashCreator({
    token: client.config.dsc.token,
    applicationID: client.config.dsc.id
});

creator
    .withServer(new GatewayServer((handler) => client.ws.on('INTERACTION_CREATE', handler)))
    .registerCommandsIn(path.join(__dirname, 'commands'))
    .syncCommands();

// Error handling
client.on('error', console.error);
client.on('warn', console.warn);
process.on('unhandledRejection', console.error);

client.login(client.config.dsc.token).catch(console.error);