const Discord = require("discord.js")
const ms = require("ms")
const Command = require("../Structure/Command")

module.exports = new Command({

    name: "unban",
    description: "Allows you to unban a user",
    utilisation: "[id du membre] (raison)",
    permission: Discord.Permissions.FLAGS.BAN_MEMBERS,
    category: "⛔ Modération",
    cooldown: 5,

    async run(bot, message, args, db) {

        let user = message.user ? args._hoistedOptions[0].value : args[0]
        if(!user) return message.reply("No people found !")

        let reason = message.user ? (args._hoistedOptions.length > 1 ? args._hoistedOptions[1].value : undefined) : args.slice(1).join(" ");
        if(!reason) reason = "No reason given";

        if((await message.guild.bans.fetch(message.user ? args._hoistedOptions[0].value : args[0])).size === 0) return message.reply("No people found in bans !")

        await message.reply(`${(await bot.users.fetch(message.user ? args._hoistedOptions[0].value : args[0])).tag} was unbanned by ${message.user === undefined ? message.author.tag : message.user.tag} for the reason${reason} with success !`)

        message.guild.members.unban(message.user ? args._hoistedOptions[0].value : args[0])
    }
})