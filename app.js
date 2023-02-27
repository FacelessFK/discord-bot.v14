const fs = require("node:fs");
const path = require("node:path");
const {
    Client,
    Collection,
    Events,
    GatewayIntentBits,
    interaction,
    REST,
    Routes
} = require("discord.js");
require("dotenv").config();

function runBot() {
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });
    // create collection for store commands
    client.commands = new Collection();

    // ------------find path of file------------
    // Grab all the command files from the commands directory
    const commandsPath = path.join(__dirname, "commands");
    const commandFiles = fs
        .readdirSync(commandsPath)
        .filter((file) => file.endsWith(".js"));

    // Grab all the event files from the events directory
    const eventsPath = path.join(__dirname, "events");
    const eventFiles = fs
        .readdirSync(eventsPath)
        .filter((file) => file.endsWith(".js"));

    // ------loop for take all each directory file---

    // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
    const commands = [];
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        commands.push(command.data.toJSON());
    }

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if ("data" in command && "execute" in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(
                `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
            );
        }
    }
    // Grab all events and execute them
    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else if (event.on) {
            client.on(event.name, (...args) => event.execute(...args));
        } else {
            console.error("the event cant execute!");
        }
    }

    const rest = new REST().setToken(process.env.DISCORD_TOKEN);

    // deploy your commands!
    (async () => {
        try {
            console.log(
                `Started refreshing ${commands.length} application (/) commands.`
            );

            // The put method is used to fully refresh all commands in the guild with the current set
            const data = await rest.put(
                // NOTE:if you wanna use your bot commands in all servers
                Routes.applicationCommands(process.env.APP_ID),

                // NOTE:if you wanna use your bot commands in specific sever
                // Routes.applicationGuildCommands(
                //     process.env.APP_ID,
                //     process.env.GUILD_ID
                // ),

                { body: commands }
            );

            console.log(
                `Successfully reloaded ${data.length} application (/) commands.`
            );
        } catch (error) {
            // And of course, make sure you catch and log any errors!
            console.error(error);
        }
    })();

    client.login(process.env.DISCORD_TOKEN);
}

module.exports = {
    runBot
};
