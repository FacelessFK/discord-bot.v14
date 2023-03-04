const fs = require("node:fs");
const path = require("node:path");
const { loadCommands } = require("./controllers/command.handler");
const { loadEvents } = require("./controllers/event.handler");
const {
    Client,
    Collection,
    GatewayIntentBits,
    interaction,
    REST,
    Routes,
} = require("discord.js");
require("dotenv").config();

function runBot() {
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });
    // create collection for store commands
    client.commands = new Collection();

    const rest = new REST().setToken(process.env.DISCORD_TOKEN);
    //load commands
    loadCommands(client, rest);
    //load events
    loadEvents(client);

    //set token on rest and login
    client.login(process.env.DISCORD_TOKEN);
}

module.exports = {
    runBot,
};
