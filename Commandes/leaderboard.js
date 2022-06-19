const Discord = require("discord.js")
const Canvas = require("discord-canvas-easy")
const Command = require("../Structure/Command")

module.exports = new Command({

    name: "leaderboard",
    description: "Allows you to know the 10 users with the most experience",
    utilisation: "leaderboard",
    permission: Discord.Permissions.FLAGS.SEND_MESSAGES,
    category: "🎲 Fun",
    cooldown : 2,

    async run(bot, message, args, db) {

        await message.reply(`In progress...`).then(async msg => {

            db.query(`SELECT * FROM user`, async (err, req) => {

                const Leaderboard = await new Canvas.Leaderboard()
                .setBot(bot)
                .setGuild(message.guild)
                .setColorFont("#ffffff")
                .setBackground("./leaderboard.png")

                const reqLength = Math.min(10, req.length);

                    for (let i = 0; i < reqLength; i++) {
                    Leaderboard.addUser(bot.users.cache.get(req[i].userID), parseInt(req[i].level), parseInt(req[i].xp), ((parseInt(req[i].level) + 1) * 1000))
                }
//                if(req.length < 10) {
//
//                    for(let i = 0; i < req.length; i++) {
//
//                        Leaderboard.addUser(bot.users.cache.get(req[i].userID), parseInt(req[i].level), parseInt(req[i]//.xp), ((parseInt(req[i].level) + 1) * 1000))
//                    }
//
//                } else {
//
//                    for(let i = 0; i < 10; i++) {
//
//                        Leaderboard.addUser(bot.users.cache.get(req[i].userID), parseInt(req[i].level), parseInt(req[i]//.xp), ((parseInt(req[i].level) + 1) * 1000))
//                    }
//                }

                const leaderboard = (await Leaderboard.toLeaderboard()).toBuffer()

                const attachment = new Discord.MessageAttachment(leaderboard, 'leaderboard.png')

                try {
                    msg.edit({content: null, files: [attachment]})
                } catch (err) {
                    message.editReply({content: null, files: [attachment]})
                }
            })
        })
    }
}) 