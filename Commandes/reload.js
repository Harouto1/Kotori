const Discord = require("discord.js")
const Command = require("../Structure/Command")

module.exports = new Command({

    name: "reload",
    description: "Allows you to reload an order",
    utilisation: "reload",
    permission: "Développeur",
    category: "🚫 DevBot",
    cooldown : 0,

    async run(bot, message, args, db) {

        const command = bot.commands.get(message.user ? args._hoistedOptions[0].value : args[0])
        if(!command) return message.reply("Please enter an order !")

        await message.reply("En cours...").then(async msg => {

            delete require.cache[require.resolve(`./${command.name}.js`)]
            bot.commands.delete(command.name)

            const pull = require(`./${command.name}.js`)
            bot.commands.get(pull.name, pull)

            try {
                await msg.edit(`The command \`${command.name}.js\` has been successfully recharged !`)
            } catch (err) {
                await message.editReply(`The command \`${command.name}.js\` has been successfully recharged !`)
            }
        })
    }
})