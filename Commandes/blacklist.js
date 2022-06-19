const Discord = require("discord.js")
const Command = require("../Structure/Command")

module.exports = new Command({

    name: "blacklist",
    description: "Allows you to add or remove a user from the blacklist",
    utilisation: "[add/remove] [membre] [raison]",
    permission: Discord.Permissions.FLAGS.MANAGE_GUILD,
    category: "📝 Blacklist",
    cooldown: 10,

    async run(bot, message, args, db) {

        let choice = message.user ? args._hoistedOptions[0].value : args[0]
        if(!choice) return message.reply("Please indicate `add` ou `remove` !")
        if(choice !== "add" && choice !== "remove") return message.reply("Please indicate `add` ou `remove` !")

        try {

            let user = message.user ? await bot.users.fetch(args._hoistedOptions[1].value) : (message.mentions.users.first() || await bot.users.fetch(args[0]))
            if(!user) return message.reply("No people found !")

            let reason = message.user ? args._hoistedOptions[2].value : args.slice(2).join(" ")
            if(!reason) return message.reply("Please enter a reason !")

            if(choice === "add") {

                db.query(`SELECT * FROM blacklist WHERE ID = '${user.id} ${message.guildId}'`, async (err, req) => {

                    if(req.length >= 1) return message.reply("Cette personne est déjà blacklist !")

                    let sql = `INSERT INTO blacklist (ID, userID, guildID, authorID, reason, date) VALUES ('${user.id} ${message.guildId}', '${user.id}', '${message.guildId}', '${message.user ? message.user.id : message.author.id}', '${reason}', '${Date.now()}')`
                    db.query(sql, function(err) {
                        if(err) throw err;
                    })

                    await message.reply(`${message.user ? message.user : message.author} have blacklists \`${user.tag}\` for the reason \`${reason}\` with success !`)
                    try {
                        await user.send(`You have been blacklisted from the server \`${message.guild.name}\` by \`${message.user ? message.user.tag : message.author.tag}\` for the reason \`${reason}\``)
                    } catch (err) {}

                    await message.guild.bans.create(user, {reason: reason})
                })
            }

            if(choice === "remove") {

                db.query(`SELECT * FROM blacklist WHERE ID = '${user.id} ${message.guildId}'`, async (err, req) => {

                    if(req.length <= 0) return message.reply("Cette personne n'est pas blacklist !")

                    db.query(`DELETE FROM blacklist WHERE ID = '${user.id} ${message.guildId}'`)

                    await message.reply(`${message.user ? message.user : message.author} a enlevé \`${user.tag}\` de la blacklist pour la raison \`${reason}\` avec succès !`)
                    try {
                        await user.send(`Vous avez été retiré de la blacklist du serveur \`${message.guild.name}\` par \`${message.user ? message.user.tag : message.author.tag}\` pour la raison \`${reason}\``)
                    } catch (err) {}

                    await message.guild.members.unban(user, reason)
                })
            }

        } catch (err) {

            return message.reply("Aucune personne trouvée !")
        }
    }
}) 