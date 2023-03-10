require("dotenv").config();
const { Routes, REST } = require("discord.js");

const rest = new REST().setToken(process.env.DISCORD_TOKEN);
function deleteCommand(commandId) {
    rest.delete(
        Routes.applicationGuildCommand(
            process.env.APP_ID,
            process.env.GUILD_ID,
            commandId
        )
    )
        .then(() => console.log("Successfully deleted guild command"))
        .catch(console.error);

    // for global commands
    rest.delete(Routes.applicationCommand(process.env.APP_ID, commandId))
        .then(() => console.log("Successfully deleted application command"))
        .catch(console.error);
}

module.exports = { deleteCommand };
