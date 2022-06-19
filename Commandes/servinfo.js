const Discord = require("discord.js")
const Command = require("../Structure/Command")

module.exports = new Command({

    name: "servinfo",
    description: "Allows to have information on the server",
    utilisation: "(membre)",
    permission: Discord.Permissions.FLAGS.SEND_MESSAGES,
    category: "🎲 Fun",
    cooldown: 0,

    async run(bot, message, args, db) {

        let Embed = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle(`Server Information ${message.guild.name}`)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .addField("Server Information", `**Nom** : ${message.guild.name}\n**Owner** : ${(await message.guild.fetchOwner())}\n**ID** : ${message.guild.id}\n**Details** : ${message.guild.description ? message.guild.description : "None"}\n**Boost** : ${message.guild.premiumSubscriptionCount} (${message.guild.premiumTier})\n**Creation date** : <t:${Math.floor(message.guild.createdAt / 1000)}:F>`)
        .addField("Stat Information", `**Salons** : ${message.guild.channels.cache.size}\n**Rôles** : ${message.guild.roles.cache.size}\n**Emojis** : ${message.guild.emojis.cache.size}\n**Members** : ${message.guild.members.cache.size}`)
        .addField("Information on special fairs", `**Règlement** : ${message.guild.rulesChannel ? message.guild.rulesChannel : "Aucun"}\n**AFK** : ${message.guild.afkChannel ? message.guild.rulesChannel : "Aucun"}`)
        .setImage(message.guild.bannerURL({ dynamic: true, size: 4096 }))
        .setTimestamp()
        .setFooter({ text: bot.user.username, iconURL: bot.user.displayAvatarURL({ dynamic: true }) })

        await message.reply({ embeds: [Embed] })
    }
})