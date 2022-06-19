const Discord = require("discord.js")
const Event = require("../../Structure/Event");
const SlashCommand = require("../../Structure/SlashCommand")

module.exports = new Event("ready", async bot => {

    const db = bot.db;

    await SlashCommand(bot);

    setTimeout(async () => {

        bot.user.setPresence({ activities: [{ name: 'keeps an eye on the spirits', type: 'PLAYING' }], status: 'online' });
    
    }, 5000)

    console.log(`${bot.user.username} : Online at ${bot.guilds.cache.size} serveur(s) !`)

    setInterval(async () => {

        db.query(`SELECT * FROM temp`, async (err, req) => {

            if(req.length < 1) return;

            for(let i = 0; i < req.length; i++) {

                if(Date.now() < parseInt(req[i].time)) return;

                if(req[i].sanctionID.startsWith("BAN")) {

                    try {

                        bot.guilds.cache.get(req[i].guildID).members.unban(req[i].userID)
                        db.query(`DELETE FROM temp WHERE sanctionID = '${req[i].sanctionID}'`)

                    } catch (err) {}
                }
            }
        })

    }, 1000)
})