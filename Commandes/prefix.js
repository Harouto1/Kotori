const Discord = require("discord.js")
const Command = require("../Structure/Command")

module.exports = new Command({

    name: "prefix",
    description: "Allows you to change the prefix of the bot",
    utilisation: "prefix",
    permission: Discord.Permissions.FLAGS.ADMINISTRATOR,
    category: "⛔ Modération",
    cooldown : 5,

    async run(bot, message, args, db) {

        db.query(`SELECT * FROM serveur WHERE guildID = ${message.guild.id}`, async (err, req) => {

            try {

                let prefix = args[0] || args._hoistedOptions[0].value
                if(!prefix) return message.reply("Vplease indicate a prefix !")

                const ancienprefix = req[0].prefix;

                db.query(`UPDATE serveur SET prefix = '${prefix}' WHERE guildID = ${message.guild.id}`)

                message.reply(`You changed the prefix, it went from \`${ancienprefix}\` à \`${prefix}\` !`)

            } catch (err) {
                return message.reply("Please enter a prefix !")
            }
        })
    }
})