const Discord = require("discord.js")
const Command = require("../Structure/Command")

module.exports = new Command({

    name: "ban",
    description: "Allows you to permanently ban a user",
    utilisation: "ban [membre] (raison)",
    permission: Discord.Permissions.FLAGS.BAN_MEMBERS,
    category: "⛔ Modération",
    cooldown : 5,

    async run(bot, message, args, db) {

        let user = message.user === undefined ? (message.mentions.users.first() || bot.users.cache.get(args[0])) : bot.users.cache.get(args._hoistedOptions[0].value)
        if(!user) return message.reply("No people found!")

        let reason = message.user ? (args._hoistedOptions.length > 1 ? args._hoistedOptions[1].value : undefined) : args.slice(1).join(" ");
        if(!reason) reason = "No reason given";

        if(message.user === undefined ? (user.id === message.author.id) : (user.id === message.user.id)) return message.reply("You can't ban yourself !")
        if(user.id === message.guild.ownerId) return message.reply("You cannot ban this person !")
        if(message.member.roles.highest.comparePositionTo(message.guild.members.cache.get(user.id).roles.highest) <= 0) return message.reply("You cannot ban this person !")

        try {
            await user.send(`${message.user === undefined ? message.author.tag : message.user.tag} banned you from the server ${message.guild.name} for the reason ${reason} !`)
        } catch (err) {}

        const ID = await bot.function.createID("BAN")

        const btn = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
        .setStyle("DANGER")
        .setLabel("Débannir")
        .setCustomId("unban")
        .setEmoji("🔓"))

        await message.reply({content: `${user.tag} was banned by ${message.user === undefined ? message.author.tag : message.user.tag} for the reason ${reason} with success !`, components: [btn]}).then(async msg => {

            await message.guild.members.cache.get(user.id).ban({reason: `${reason} (Banned by ${message.user === undefined ? message.author.tag : message.user.tag})`})

            if(reason.includes("'")) reason = reason.replace(/'/g, "\\'")

             let sql = `INSERT INTO bans (userID, authorID, banID, guildID, reason, date, time) VALUES (${user.id}, '${message.user === undefined ? message.author.id : message.user.id}', '${ID}', '${message.guildId}', '${reason}', '${Date.now()}', 'definitely')`
            db.query(sql, function(err) {
                if(err) throw err;
            })

            const filter = async() => true;
            const collector = msg.createMessageComponentCollector({filter})

            collector.on("collect", async button => {

                if(!button.member.permissions.has(new Discord.Permissions(Discord.Permissions.FLAGS.BAN_MEMBERS))) return button.reply({content: "You do not have the required permission to click this button !", ephemeral: true})

                if(button.customId === "unban") {

                    await message.guild.members.unban(user.id)

                    await button.reply(`${button.user.tag} unbanned ${user.tag} !`)

                    await collector.stop()
                }
            })
        })
    }
})