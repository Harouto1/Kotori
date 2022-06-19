const Discord = require("discord.js")
const Event = require("../../Structure/Event")

module.exports = new Event("guildMemberAdd", async (bot, member) => {

    const db = bot.db;

    db.query(`SELECT * FROM serveur WHERE guildID = ${member.guild.id}`, async (err, req) => {

        if(req.length < 1) return;

        if(req[0].raid === "on") {

            try {
                await member.user.send("This server is in anti-raid mode !")
            } catch (err) {}

            await member.kick("Mode anti-raid Enable")
        }
    })
})