const { SlashCommandBuilder } = require("discord.js");
const wait = require("timers/promises").setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!"),
    async execute(interaction) {
        await interaction.reply({ content: "pong!", ephemeral: true }); // ephemeral = user who use this command can see response
        await interaction.followUp("Pong again!");
        await wait(5000);
        await interaction.deleteReply();
    }
};
