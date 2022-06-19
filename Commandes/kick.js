const Discord = require("discord.js")
const Command = require("../Structure/Command")

module.exports = new Command({

    name: "kick",
    description: "Allows you to kick a user",
    utilisation: "kick [membre] (raison)",
    permission: Discord.Permissions.FLAGS.KICK_MEMBERS,
    category: "⛔ Modération",
    cooldown : 5,

    async run(bot, message, args, db) {

        let user = message.user === undefined ? (message.mentions.users.first() || bot.users.cache.get(args[0])) : bot.users.cache.get(args._hoistedOptions[0].value)
        if(!user) message.reply("No people found !")

        let reason = message.user ? (args._hoistedOptions.length > 1 ? args._hoistedOptions[1].value : undefined) : args.slice(1).join(" ");
        if(!reason) reason = "No reason given";

        if(message.user === undefined ? (user.id === message.author.id) : (user.id === message.user.id)) return message.reply("You can't evict yourself !")
        if(user.id === message.guild.ownerId) return message.reply("You can't evict this person !")
        if(message.member.roles.highest.comparePositionTo(message.guild.members.cache.get(user.id).roles.highest) <= 0) return message.reply("You can't evict this person !")

        const ID = await bot.function.createID("KICK")

        try {
            await user.send(`${message.user === undefined ? message.author.tag : message.user.tag} kicked you off the server ${message.guild.name} for the reason ${reason} !`)
        } catch (err) {}
        await message.reply(`${user.tag} was expelled by ${message.user === undefined ? message.author.tag : message.user.tag} for the reason ${reason} with success !`)

        await message.guild.members.cache.get(user.id).kick(`${reason} (Banned by ${message.user === undefined ? message.author.tag : message.user.tag})`)

        if(reason.includes("'")) reason = reason.replace(/'/g, "\\'")

        let sql = `INSERT INTO kicks (userID, authorID, kickID, guildID, reason, date) VALUES(${user.id}, '${message.user === undefined ? message.author.id : message.user.id}', '${ID}', '${message.guildId}', '${reason}', '${Date.now()}')`
        db.query(sql, function(err) {
            if(err) throw err;
        })
    }
})