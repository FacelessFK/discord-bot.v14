const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("owner")
        .setDescription("owners info"),
    async execute(interaction) {
        await interaction.reply(`Faceless and Kneonix made this goddamn bot`);
    }
};
