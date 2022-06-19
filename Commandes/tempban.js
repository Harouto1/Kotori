const Discord = require("discord.js")
const ms = require("ms")
const Command = require("../Structure/Command")

module.exports = new Command({

    name: "tempban",
    description: "Allows you to temporarily ban a user",
    utilisation: "[membre] [temps] (raison)",
    permission: Discord.Permissions.FLAGS.BAN_MEMBERS,
    category: "⛔ Modération",
    cooldown: 10,

    async run(bot, message, args, db) {

        let user = message.user ? bot.users.cache.get(args._hoistedOptions[0].value) : (message.mentions.users.first() || bot.users.cache.get(args[0]))
        if(!user) return message.reply("No people found !")

        let time = message.user ? args._hoistedOptions[1].value : args[1]
        if(!time) return message.reply("Please indicate a duration !")
        if(!parseInt(ms(time))) return message.reply("The indicated time is invalid !")

        let reason = message.user ? (args._hoistedOptions.length > 2 ? args._hoistedOptions[2].value : undefined) : args.slice(2).join(" ");
        if(!reason) reason = "No reason given";

        if(message.user === undefined ? (user.id === message.author.id) : (user.id === message.user.id)) return message.reply("you can't ban yourself !")
        if(user.id === message.guild.ownerId) return message.reply("You cannot ban this person !")
        if(message.member.roles.highest.comparePositionTo(message.guild.members.cache.get(user.id).roles.highest) <= 0) return message.reply("You cannot ban this person !")

        const ID = await bot.function.createID("BAN")

        try {
            await user.send(`${message.user === undefined ? message.author.tag : message.user.tag} banned you from the server ${message.guild.name} during ${time} for the reason ${reason} !`)
        } catch (err) {}

        let sql = `INSERT INTO bans (userID, authorID, banID, guildID, reason, date, time) VALUES (${user.id}, '${message.user === undefined ? message.author.id : message.user.id}', '${ID}', '${message.guildId}', '${reason}', '${Date.now()}', '${time}')`
        db.query(sql, function(err) {
            if(err) throw err;
        })

        await message.reply(`${user.tag} was banned by ${message.user === undefined ? message.author.tag : message.user.tag} during ${time} for the reason ${reason} with success !`)

        let sql2 = `INSERT INTO temp (userID, guildID, sanctionID, time) VALUES (${user.id}, '${message.guildId}', '${ID}', '${Date.now() + ms(time)}')`
        db.query(sql2, function(err) {
            if(err) throw err;
        })

        message.guild.members.cache.get(user.id).ban({reason: `${reason} (ban by ${message.user ? message.user.tag : message.author.tag})`})
    }
})