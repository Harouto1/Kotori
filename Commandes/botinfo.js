const Discord = require("discord.js")
const Command = require("../Structure/Command")

module.exports = new Command({

    name: "botinfo",
    description: "Allows to have information about the bot",
    utilisation: "(membre)",
    permission: Discord.Permissions.FLAGS.SEND_MESSAGES,
    category: "🎲 Fun",
    cooldown: 0,

    async run(bot, message, args, db) {


        let Embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`${bot.user.tag}`)
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
        .addField('**• Version**', `1.0.0`, true)
        .addField(`**• Users**`, `${bot.users.cache.size} users`, true)
        .addField('**• Servers**', `${bot.guilds.cache.size} guilds`, true)
        .addField('**• Dev**', `Kisara-Lab#7265`, true)
        .addField('**• Ping**', `${bot.ws.ping}ms`, true)
        .addField('**• Commands**', `${bot.commands.size} cmds`,true)

        .setTimestamp()
       .setFooter(
       `Kotori Itsuka`,
        bot.user.displayAvatarURL())
        await message.reply({ embeds: [Embed] })
     }
})