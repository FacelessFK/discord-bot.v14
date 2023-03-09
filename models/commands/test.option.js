const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

const data = new SlashCommandBuilder()
    .setName("mute")
    .setDescription("mute user specific time")
    .addUserOption((option) => {
        return option
            .setName("target")
            .setDescription("select a user")
            .setRequired(true);
    })
    .addIntegerOption((option) => {
        return option
            .setName("time")
            .setDescription("give some minute")
            .setRequired(true);
    })
    .addStringOption((option) =>
        option.setName("reason").setDescription("The reason for banning")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .setDMPermission(false);

async function execute(interaction) {
    const target = interaction.options.getUser("target");
    const time = interaction.options.getInteger("time");
    const reason =
        interaction.options.getString("reason") ?? "No reason provided";
    const member = interaction.options.getMember("target");
    await interaction.reply(
        `user ${target.username} get timeout for ${time}min for ${reason} reason`
    );
    // member.timeout(60_000);
}
module.exports = { data, execute };
