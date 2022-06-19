const Discord = require("discord.js")
const Command = require("../Structure/Command")

module.exports = new Command({

    name: "antiraid",
    description: "Allows you to enable or disable the anti-raid world",
    utilisation: "[on/off]",
    permission: Discord.Permissions.FLAGS.MANAGE_GUILD,
    category: "⛔ Modération",
    cooldown: 10,

    async run(bot, message, args, db) {

        let choix = message.user ? args._hoistedOptions[0].value : args[0]
        if(!choix) return message.reply("Please indicate \`on\` ou \`off\` !")
        if(choix !== "on" && choix !== "off") return message.reply("Please indicate \`on\` ou \`off\` !")

        db.query(`SELECT * FROM serveur WHERE guildID = ${message.guild.id}`, async (err, req) => {

            if(req.length < 1) return message.reply("This server is not yet registered!")
            if(req[0].raid === choix) return message.reply(`Anti-raid is already ${choix === "on" ? "Enabled" : "Disabled"} !`)

            db.query(`UPDATE serveur SET raid = '${choix}' WHERE guildID = ${message.guildId}`)

            message.reply(`The anti-raid is has been ${choix === "on" ? "Enabled" : "Disabled"} !`)
        })
    }
})