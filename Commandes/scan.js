const Discord = require("discord.js")
const Command = require("../Structure/Command")

module.exports = new Command({

    name: "scan",
    description: "Lets you know if a member is blacklisted",
    utilisation: "[membre]",
    permission: "Aucune",
    category: "📝 Blacklist",
    cooldown: 10,

    async run(bot, message, args, db) {

        try {

            let user = message.user ? await bot.users.fetch(args._hoistedOptions[0].value) : (message.mentions.users.first() || await bot.users.fetch(args[0].value));
            if(!user) return message.reply("No people found !")

            db.query(`SELECT * FROM blacklist WHERE ID = '${user.id} ${message.guildId}'`, async (err, req) => {

                if(req.length <= 0) return message.reply("This person is not blacklisted !")

                let Embed = new Discord.MessageEmbed()
                .setColor("#0099ff")
                .setTitle(`Blacklist Of ${user.tag}`)
                .setThumbnail(user.displayAvatarURL({dynamic: true}))
                .setDescription(`> **Auteur** : ${bot.users.cache.get(req[0].authorID)}\n> **Date** : <t:${Math.floor(parseInt(req[0].date) / 1000)}:F>\n\`\`\`${req[0].reason}\`\`\``)
                .setTimestamp()
                .setFooter({text: bot.user.username, iconURL: bot.user.displayAvatarURL({dynamic: true})})

                await message.reply({embeds: [Embed]})
            })

        } catch (err) {

            return message.reply("No people found !")
        }
    }
})