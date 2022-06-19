const Discord = require("discord.js")
const Command = require("../Structure/Command")

module.exports = new Command({

    name: "warn",
    description: "Allows to warn a user",
    utilisation: "[membre] (raison)",
    alias: ["warn", "warning"],
    permission: Discord.Permissions.FLAGS.MANAGE_MESSAGES,
    category: "⛔ Modération",
    cooldown : 5,

    async run(bot, message, args, db) {

        let user = message.user ? bot.users.cache.get(args._hoistedOptions[0].value) : (bot.users.cache.get(args[0]) || message.mentions.users.first())
        if(!user) return message.reply("No people found !")
        if(!message.guild.members.cache.get(user.id)) return message.reply("No people found !")

        let reason = message.user ? args._hoistedOptions[1].value : args.slice(1).join("")
        if(!reason) reason = "No reason given";

        if(message.user === undefined ? (user.id === message.author.id) : (user.id === message.user.id)) return message.reply("You can't ban yourself !")
        if(user.id === message.guild.ownerId) return message.reply("You cannot ban this person !")
        if(message.member.roles.highest.comparePositionTo(message.guild.members.cache.get(user.id).roles.highest) <= 0) return message.reply("You cannot ban this person !")

        const ID = await bot.function.createID("WARN")

        await message.reply(`${message.user ? message.user.tag : message.author.tag} advised ${user.tag} for the reason ${reason} !`)
        try {
            await user.send(`${message.user ? message.user.tag : message.author.tag} warned you for the reason ${reason} !`)
        } catch (err) {}

        let sql = `INSERT INTO warns (userID, authorID, warnID, guildID, reason, date) VALUES (${user.id}, '${message.user ? message.user.id : message.author.id}', '${ID}', '${message.guildId}', '${reason}', '${Date.now()}')`
        db.query(sql, function(err) {
            if(err) throw err;
        })
    }
})