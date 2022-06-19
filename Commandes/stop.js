const Discord = require("discord.js")
const Command = require("../Structure/Command")

module.exports = new Command({

    name: "stop",
    description: "Stop the bot",
    utilisation: "stop",
    permission: Discord.Permissions.FLAGS.SEND_MESSAGES,
    category: "🚫 DevBot",
    cooldown : 0,

    async run(bot, message, args, db) {

        await message.reply("The bot has been successfully terminated !")

        await require("child_process").execSync("pm2 stop Kotori")
    }
})