const Discord = require("discord.js")
const Command = require("../Structure/Command")

module.exports = new Command({

    name: "ping",
    description: "Permet de connaître la latence du bot",
    utilisation: "ping",
    permission: Discord.Permissions.FLAGS.SEND_MESSAGES,
    category: "🎲 Fun",
    cooldown : 2,

    async run(bot, message, args, db) {

        const startTimeDB = Date.now()

        db.query(`SELECT * FROM serveur WHERE guildID = ${message.guild.id}`, async (err, req) => {

            const endTimeDB = Date.now()

            const startTime = Date.now()

            await message.reply(`In progress...`).then(async msg => {

                const endTime = Date.now()

                try {
                    await msg.edit(`\`Latency due to bot\` : ${endTime - startTime}ms\n\`Discord API latency\` : ${bot.ws.ping}ms\n\`Database latency\` : ${endTimeDB - startTimeDB}ms`)
                } catch (err) {
                    await message.editReply(`\`Latency due to bot\` : ${endTime - startTime}ms\n\`Discord API latency\` : ${bot.ws.ping}ms\n\`Database latency\` : ${endTimeDB - startTimeDB}ms`)
                }
            })
        })
    }
})