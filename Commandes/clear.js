const Discord = require("discord.js")
const Command = require("../Structure/Command")

module.exports = new Command({

    name: "clear",
    description: "Allows you to delete a number of messages",
    utilisation: "clear [nombre de messages]",
    permission: Discord.Permissions.FLAGS.MANAGE_MESSAGES,
    category: "⛔ Modération",
    cooldown : 5,

    async run(bot, message, args, db) {

        try {

            let number = args[0] || args._hoistedOptions[0].value
            if(isNaN(number)) return message.reply("Please enter a number between`0` et `100` !")
            if(parseInt(number) <= 0 || parseInt(number) > 100) return message.reply("Please enter a number between `0` and `100` !")

            try {await message.delete()} catch (err) {}

            message.channel.bulkDelete(number).catch(async err => {
                console.log(err)
                if(err) return message.reply("Messages are older than 14 days!")

            }).then(async msg => {

                try {
                    await message.reply(`${message.author === undefined ? message.user : message.author} deleted \`${msg.size}\` messages successfully !`)
                } catch (err) {
                    await message.channel.send(`${message.author === undefined ? message.user : message.author} deleted \`${msg.size}\` messages successfully !`).then(async mess => setTimeout(async () => {mess.delete()}, 5000))
                }
            })

        } catch (err) {

            return message.reply("Please enter a number between `0` and `100`!")
        }
    }
})