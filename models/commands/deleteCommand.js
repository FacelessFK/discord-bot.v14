const { deleteCommand } = require("../../controllers/delete.command");
const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

const data = new SlashCommandBuilder()
    .setName("delete_command")
    .setDescription("delete command by command id")
    .addStringOption((option) => {
        return option
            .setName("command_id")
            .setDescription("get command id")
            .setRequired(true);
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false);
// time out user and give feed back
async function execute(interaction) {
    let errText;
    const commandId = interaction.options.getString("command_id");
    try {
        deleteCommand(commandId, interaction);
        interaction.reply("success delete");
    } catch (error) {
        console.log(`error is ${err}`);
        interaction.reply(`the error happenin ${err}`);
    }
}
module.exports = { data, execute };
