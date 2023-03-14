const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder
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
    row2: new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId("second")
            .setLabel("death")
            .setStyle(ButtonStyle.Danger)
            .setEmoji("💀")
    ),
    embed: new EmbedBuilder()
        .setColor(0x11eee7)
        .setTitle("bia ino bokhor")
        .setURL("https://w3school.com")
        .setDescription("link to the w3 website"),
    embed2: new EmbedBuilder()
        .setColor(0x11eee7)
        .setTitle("to bia ino bokhor ")
        .setURL("https://w3school.com")
        .setDescription("link to the fucking w3 website"),
    async execute(interaction, click) {
        await interaction.reply({
            content: "pong!",
            embeds: [this.embed],
            components: [this.row1]
        });
        // collect all replay component by filter and specific time
        const collector = interaction.channel.createMessageComponentCollector({
            filter: (client) => client.customId === "primary",
            time: 15000
        });
        // when you click on components before end of time do this
        collector.on("collect", async (i) => {
            // update your component
            await i.update({
                content: "change to death",
                embeds: [this.embed2],
                components: [this.row2]
            });
        });
        //  waiting response
        // collector.on("collect", async (i) => {
        //     if (i.customId === "primary") {
        //         await i.deferUpdate(); for every thing except update we should use deferUpdate
        //         await wait(4000);
        //         await i.editReply({
        //             content: "A button was clicked!",
        //             components: []
        //         });
        //     }
        // });
        // end of click button and log all collected items
        collector.on("end", (collected) =>
            console.log(`Collected ${collected.size} items`)
        );
    }
};
