const Event = require("../../Structure/Event");
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const { SlashCommandBuilder } = require("@discordjs/builders")
const { token } = require("../../config")

module.exports = new Event("guildCreate", async (bot, guild) => {

    const commands = [

        new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Allows to know the latency of the bot"),

        new SlashCommandBuilder()
        .setName("prefix")
        .setDescription("Allows you to change the prefix of the bot")
        .addStringOption(option => option.setName("préfixe").setDescription("The prefix that the bot must have").setRequired(true)),

        new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Allows you to delete a number of messages")
        .addStringOption(option => option.setName("nombre").setDescription("The number of messages to delete").setRequired(true)),

        new SlashCommandBuilder()
        .setName("rank")
        .setDescription("Allows to know the experience of a user")
        .addUserOption(option => option.setName("membre").setDescription("The member where you want the experience").setRequired(false)),

        new SlashCommandBuilder()
        .setName("leaderboard")
        .setDescription("Get to know the most experienced users"),

        new SlashCommandBuilder()
        .setName("excelsior")
        .setDescription("Allows to delete all the messages of a channel", " WARNING To be used only if necessary operation not irreversible "),

        new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Allows you to permanently ban a user")
        .addUserOption(option => option.setName("membre").setDescription("The member to ban").setRequired(true))
        .addStringOption(option => option.setName("raison").setDescription("The reason for the ban").setRequired(false)),

        new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Allows you to kick a user")
        .addUserOption(option => option.setName("membre").setDescription("The member to be kick").setRequired(true))
        .addStringOption(option => option.setName("raison").setDescription("The reason for the kick").setRequired(false)),

        new SlashCommandBuilder()
        .setName("restart")
        .setDescription("Lets restart the bot !"),

        new SlashCommandBuilder()
        .setName("stop")
        .setDescription("Stop the bot!"),

        new SlashCommandBuilder()
        .setName("eval")
        .setDescription("Allows you to evaluate a code")
        .addStringOption(option => option.setName("code").setDescription("The code to evaluate").setRequired(true)),

        new SlashCommandBuilder()
        .setName("reload")
        .setDescription("Allows you to reload an order")
        .addStringOption(option => option.setName("commande").setDescription("The order to reload").setRequired(true)),

        new SlashCommandBuilder()
        .setName("help")
        .setDescription("Allows you to know all the commands of the bot")
        .addStringOption(option => option.setName("commande").setDescription("The order where you want the information").setRequired(false)),

        new SlashCommandBuilder()
        .setName("warn")
        .setDescription("Allows to warn a user")
        .addUserOption(option => option.setName("membre").setDescription("The member to notify").setRequired(true))
        .addStringOption(option => option.setName("raison").setDescription("The reason for the warning").setRequired(false)),

        new SlashCommandBuilder()
        .setName("antiraid")
        .setDescription("Enable or disable anti-raid")
        .addStringOption(option => option.setName("état").setDescription("The state of anti-raid").setRequired(true)),

        new SlashCommandBuilder()
        .setName("tempban")
        .setDescription("Allows you to temporarily ban a user")
        .addUserOption(option => option.setName("membre").setDescription("The member to ban").setRequired(true))
        .addStringOption(option => option.setName("temps").setDescription("The time of banishment").setRequired(true))
        .addStringOption(option => option.setName("raison").setDescription("The reason for the ban").setRequired(false)),

        new SlashCommandBuilder()
        .setName("unban")
        .setDescription("Allows you to unban a user")
        .addUserOption(option => option.setName("membre").setDescription("The member to unban").setRequired(true))
        .addStringOption(option => option.setName("raison").setDescription("The reason for the unban").setRequired(false)),

        new SlashCommandBuilder()
        .setName("mute")
        .setDescription("Allows you to temporarily mute a user")
        .addUserOption(option => option.setName("membre").setDescription("The member to be muted").setRequired(true))
        .addStringOption(option => option.setName("temps").setDescription("The silent time").setRequired(true))
        .addStringOption(option => option.setName("raison").setDescription("The reason for the mute").setRequired(false)),

        new SlashCommandBuilder()
        .setName("unmute")
        .setDescription("Allows to render the speech of a user")
        .addUserOption(option => option.setName("membre").setDescription("The member to speak to").setRequired(true))
        .addStringOption(option => option.setName("raison").setDescription("The reason for speaking").setRequired(false)),

        new SlashCommandBuilder()
        .setName("lock")
        .setDescription("Allows you to lock a room")
        .addChannelOption(option => option.setName("salon").setDescription("The locker room").setRequired(true))
        .addStringOption(option => option.setName("raison").setDescription("The reason for the lock").setRequired(false)),

        new SlashCommandBuilder()
        .setName("unlock")
        .setDescription("Allows you to unlock a room")
        .addChannelOption(option => option.setName("salon").setDescription("The living room to unlock").setRequired(true))
        .addStringOption(option => option.setName("raison").setDescription("The reason for the unlock").setRequired(false)),

        new SlashCommandBuilder()
        .setName("blacklist")
        .setDescription("Allows you to add or remove a user from the blacklist")
        .addStringOption(option => option.setName("choix").setDescription("The choice of the blacklist").setRequired(true).addChoices({name: "add", value: "add"}, {name: "remove", value: "remove"}))
        .addUserOption(option => option.setName("membre").setDescription("The blacklisted member").setRequired(true))
        .addStringOption(option => option.setName("raison").setDescription("The reason for the blacklist").setRequired(true)),

        new SlashCommandBuilder()
        .setName("scan")
        .setDescription("Lets you know if a member is blacklisted")
        .addUserOption(option => option.setName("membre").setDescription("The member to observe").setRequired(true)),

        new SlashCommandBuilder()
        .setName("servinfo")
        .setDescription("Allows to have information on the server!"),

        new SlashCommandBuilder()
        .setName("userinfo")
        .setDescription("Allows to have information about a user!"),

        new SlashCommandBuilder()
        .setName("botinfo")
        .setDescription("Allows to have information on the bot!"),

        new SlashCommandBuilder()
        .setName("warnlist")
        .setDescription("Allows you to know all the offenses of a user!"),

        new SlashCommandBuilder()
        .setName("clearuser")
        .setDescription("Allows you to delete a number of messages from a specific user")
        .addStringOption(option => option.setName("nombre").setDescription("The number of messages to delete").setRequired(true)),

        new SlashCommandBuilder()
        .setName("slowmode")
        .setDescription("Allows you to set the slowmode on the channel")
        .addStringOption(option => option.setName("temps").setDescription("time of the slowmode").setRequired(true))
        .addStringOption(option => option.setName("raison").setDescription("The reason for slowmode").setRequired(false)),

        new SlashCommandBuilder()
        .setName("tictactoe")
        .setDescription("play a tictactoe")

    ]

    const rest = new REST({ version: "9" }).setToken(token)

    await rest.put(Routes.applicationGuildCommands(bot.user.id, guild.id), { body: commands });
})