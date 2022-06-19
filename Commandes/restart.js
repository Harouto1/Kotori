const Discord = require("discord.js")
const Command = require("../Structure/Command")

module.exports = new Command({

    name: "restart",
    description: "Lets restart the bot",
    utilisation: "restart",
    permission: "Développeur",
    category: "🚫 DevBot",
    cooldown : 0,

    async run(bot, message, args, db) {

        await message.reply("The bot was successfully restarted !")

        await require("child_process").execSync("pm2 restart Kotori")
    }
})