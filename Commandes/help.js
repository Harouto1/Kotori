const Discord = require("discord.js")
const Command = require("../Structure/Command")

module.exports = new Command({

    name: "help",
    description: "Allows you to know all the commands of the bot",
    utilisation: "help",
    permission: Discord.Permissions.FLAGS.SEND_MESSAGES,
    category: "🎲 Fun",
    cooldown : 2,

    async run(bot, message, args, db) {

        const command = message.user ? bot.commands.get(args._hoistedOptions.length !== 0 ? args._hoistedOptions[0].value : "") : bot.commands.get(args[0])

        db.query(`SELECT * FROM serveur WHERE guildID = ${message.guildId}`, async (err, req) => {

            if(!command) {

                const categories = [];
                const commands = bot.commands;

                commands.forEach((command) => {
                    if(!categories.includes(command.category)) {
                        categories.push(command.category);
                    }
                });

                let Embed = new Discord.MessageEmbed()
                .setColor("#0099ff")
                .setTitle(`All bot commands`)
                .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
                .setDescription("Here are all the commands of the bot")
                .setTimestamp()
                .setFooter(`${message.user ? message.user.username : message.author.username}`, message.user ? message.user.displayAvatarURL({dynamic: true}) : message.author.displayAvatarURL({dynamic: true}))

                categories.sort().forEach((cat, i) => {
                    const tCommands = commands.filter((cmd) => cmd.category === cat);
                    Embed.addField(cat, tCommands.map((cmd) => "> `" + req[0].prefix + cmd.name + "` ➔ " + cmd.description).join("\n"));
                });

                message.reply({embeds: [Embed]})

            }

            if(command) {

                let Embed = new Discord.MessageEmbed()
                .setColor("#0099ff")
                .setTitle(`All bot commands`)
                .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
                .setDescription(`Command name : \`${command.name}\`\nDescription of the command : \`${command.description}\`\nUsing the command : \`${command.utilisation}\`\nOrder Category: \`${command.category}\`\nCommand Permission : \`${new Discord.Permissions(command.permission).toArray(false)}\``)
                .setTimestamp()
                .setFooter(`${message.user ? message.user.username : message.author.username}`, message.user ? message.user.displayAvatarURL({dynamic: true}) : message.author.displayAvatarURL({dynamic: true}))

                message.reply({embeds: [Embed]})
            }
        })
    }
})