const Discord = require("discord.js")
const Command = require("../Structure/Command")

module.exports = new Command({

    name: "userinfo",
    description: "Allows to have information about a user",
    utilisation: "(membre)",
    permission: Discord.Permissions.FLAGS.SEND_MESSAGES,
    category: "🎲 Fun",
    cooldown: 0,

    async run(bot, message, args, db) {

        try {

            let user;
            if(message.user ? args._hoistedOptions.length >= 1 : args.length >= 1) {
                user = message.user ? await bot.users.fetch(args._hoistedOptions[0].value) : (message.mentions.users.first() || await bot.users.fetch(args[0]))
                if(!user) return message.reply("No people found !")
            } else user = message.user ? message.user : message.author;
            let member = message.guild.members.cache.get(user.id)

            let Embed = new Discord.MessageEmbed()
            .setColor("#0099ff")
            .setTitle(`Information on ${user.tag}`)
            .setThumbnail(user.displayAvatarURL({dynamic: true}))
            .addField("User Information", `**Pseudo** : ${user.username}\n**Tag** : ${user.discriminator}\n**URL of the avatar** : [URL](${user.displayAvatarURL({dynamic: true})})\n**bot** : ${user.bot ? "yes" : "No"}\n**Status** : ${member ? member.presence ? member.presence.status : "Offline" : "Unknown"}\n**Badges** : ${(await user.fetchFlags()).toArray().length >= 1 ? (await user.fetchFlags()).toArray().join(" ") : "Non"}\n**Account creation date** : <t:${Math.floor(user.createdAt / 1000)}:F>\n`)
            member ? Embed.addField("User Information", `**Surnom** : ${member.nickname ? member.nickname : "None"}\n**Rôles (${member.roles.cache.size})** : ${member.roles.cache.map(r => `${r}`).join(" ")}\n**Date of arrival on the server** : <t:${Math.floor(member.joinedAt / 1000)}:F>`) : ""
            Embed.setImage(await (await bot.users.fetch(user.id, {force: true})).bannerURL({dynamic: true, size: 4096}))
            .setTimestamp()
            .setFooter({text: bot.user.username, iconURL: bot.user.displayAvatarURL({dynamic: true})})

            await message.reply({embeds: [Embed]})

        } catch (err) {

            return message.reply("No people found!")
        }
    }
}) 