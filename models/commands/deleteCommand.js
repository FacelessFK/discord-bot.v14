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
    deleteCommand(commandId);
    //todo handel
}
module.exports = { data, execute };
