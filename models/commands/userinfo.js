const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("user")
        .setDescription("Provides information about the user."),
    async execute(interaction) {
        // interaction.user is the object representing the User who ran the command
        // interaction.member is the GuildMember object, which represents the user in the specific guild
        await interaction.reply(
            `${interaction.user.username}, who joined on ${
                interaction.member.joinedAt
            }.\n${interaction.user.displayAvatarURL()} \n ${interaction.locale}`
        );

        const message = await interaction.fetchReply(); //fetch = all detail about bot and user who use this command
        await interaction.followUp(message.interaction.user.username);
    }
};
