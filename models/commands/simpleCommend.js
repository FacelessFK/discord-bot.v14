const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
} = require("discord.js");
const wait = require("timers/promises").setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!"),
    row1: new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId("primary")
            .setLabel("reply")
            .setStyle(ButtonStyle.Success)
            .setEmoji("😎")
    ),
    embed: new EmbedBuilder()
        .setColor(0x11eee7)
        .setTitle("bia ino bokhor")
        .setURL("https://w3school.com")
        .setDescription("link to the w3 website"),
    async execute(interaction) {
        //TODO: add another intraction
        await interaction.reply({
            content: "pong!",
            embeds: [this.embed],
            components: [this.row1],
        });
    },
};
