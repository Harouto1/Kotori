const Discord = require("discord.js")
const Command = require("../Structure/Command")

module.exports = new Command({

    name: "lock",
    description: "Allows you to lock a room",
    utilisation: "[channel] (reason)",
    alias: ["lock"],
    permission: Discord.Permissions.FLAGS.MANAGE_CHANNELS,
    category: "⛔ Modération",
    cooldown: 10,

    async run(bot, message, args, db) {

        let channel = message.user ? message.guild.channels.cache.get(args._hoistedOptions[0].value) : (message.mentions.channels.first() || message.guild.channels.cache.get(args[0]))
        if(!channel) return message.reply("No room found !")

        let reason = message.user ? args._hoistedOptions.length > 1 ? args._hoistedOptions[1].value : undefined : args.slice(1).join(" ");
        if(!reason) reason = "No reason given";

        if(channel.permissionOverwrites.cache.get(message.guild.roles.everyone.id)?.deny.toArray(false).includes("SEND_MESSAGES")) return message.reply("This room is already locked !")

        await channel.permissionOverwrites.edit(message.guild.roles.everyone.id, {
            SEND_MESSAGES: false
        })

        await message.reply(`The channel has been successfully locked ! \`${reason}\``)
        await channel.send(`This room has been locked by ${message.user ? message.user : message.author} ! \`${reason}\``)
    }
})