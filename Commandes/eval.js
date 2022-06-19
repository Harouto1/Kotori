const Discord = require("discord.js")
const Command = require("../Structure/Command")

module.exports = new Command({

    name: "eval",
    description: "Allows you to evaluate a code",
    utilisation: "eval [code]",
    permission: "Développeur",
    category: "🚫 DevBot",
    cooldown : 0,

    async run(bot, message, args, db) {

        const code = message.user ? args._hoistedOptions[0].value : args.slice(0).join(" ")
        if(!code) return message.reply("Please enter a code !")

        try {

            let output = eval(code)
            if(typeof output !== 'string') output = require("util").inspect(output, {depth: 0})

            if(output.includes(bot.token)) return message.reply("You can't get the token from the bot !")

            let Embed = new Discord.MessageEmbed()
            .setColor("#0099ff")
            .setTitle("Rating a code")
            .setDescription(`Code donné : \`\`\`js\n${code}\`\`\`\nCode reçu : \`\`\`js\n${output}\`\`\``)
            .setTimestamp()
            .setFooter(`${message.user ? message.user.username : message.author.username}`, message.user ? message.user.displayAvatarURL({dynamic: true}) : message.author.displayAvatarURL({dynamic: true}))

            message.reply({embeds: [Embed]})

        } catch (err) {

            let Embed = new Discord.MessageEmbed()
            .setColor("#0099ff")
            .setTitle("Rating a code")
            .setDescription(`Code donné : \`\`\`js\n${code}\`\`\`\nCode reçu : \`\`\`js\n${err}\`\`\``)
            .setTimestamp()
            .setFooter(`${message.user ? message.user.username : message.author.username}`, message.user ? message.user.displayAvatarURL({dynamic: true}) : message.author.displayAvatarURL({dynamic: true}))

            message.reply({embeds: [Embed]})
        }
    }
})