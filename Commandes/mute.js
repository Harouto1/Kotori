const Discord = require("discord.js")
const ms = require("ms")
const Command = require("../Structure/Command")

module.exports = new Command({

    name: "mute",
    description: "Allows you to temporarily mute a user",
    utilisation: "[membre] (raison)",
    permission: Discord.Permissions.FLAGS.MODERATE_MEMBERS,
    category: "⛔ Modération",
    cooldown: 5,

    async run(bot, message, args, db) {
        let user = message.user === undefined ? (message.mentions.users.first() || bot.users.cache.get(args[0])) : bot.users.cache.get(args._hoistedOptions[0].value)
        if(!user) return message.reply("No people found !")

        let time = message.user ? args._hoistedOptions[1].value : args[1]
        if(!time) return message.reply("Please indicate a duration !")
        if(!parseInt(ms(time))) return message.reply("The indicated time is invalid !")
        if(ms(time) > 2419200000) return message.reply("The time should not be more than 28 days !")

        let reason = message.user ? (args._hoistedOptions.length > 2 ? args._hoistedOptions[2].value : undefined) : args.slice(2).join(" ");
        if(!reason) reason = "No reason given";

        if(message.user === undefined ? (user.id === message.author.id) : (user.id === message.user.id)) return message.reply("You can't mute yourself!")
        if(user.id === message.guild.ownerId) return message.reply("You can't mute this person!")
        if(message.member.roles.highest.comparePositionTo(message.guild.members.cache.get(user.id).roles.highest) <= 0) return message.reply("You can't mute this person !")
        if(message.guild.members.cache.get(user.id).isCommunicationDisabled()) return message.reply("This person is already mute !")

        try {
            await user.send(`${message.user === undefined ? message.author.tag : message.user.tag} made you mute During ${time} from the server ${message.guild.name} for the reason ${reason} !`)
        } catch (err) {}

        const ID = await bot.function.createID("MUTE")

        let sql = `INSERT INTO mutes (userID, authorID, muteID, guildID, reason, date, time) VALUES (${user.id}, '${message.user === undefined ? message.author.id : message.user.id}', '${ID}', '${message.guildId}', '${reason}', '${Date.now()}', '${time}')`
        db.query(sql, function(err) {
            if(err) throw err;
        })

        await message.guild.members.cache.get(user.id).timeout(ms(time), reason)

        await message.reply({content: `${user.tag} was mute by ${message.user === undefined ? message.author.tag : message.user.tag} During ${time} for the reason ${reason} with success !`})
    }
})