const { tictactoe } = require('reconlx')
const Discord = require("discord.js")
const Command = require("../Structure/Command")

module.exports = new Command({

    name: "tictactoe",
    description: "play a tictactoe",
    utilisation: "tictactoe",
    permission: Discord.Permissions.FLAGS.SEND_MESSAGES,
    category: "🎲 Fun",
    cooldown : 5,

    async run  (client, message, args, db) { 

        const simplydjs = require('simply-djs')

        simplydjs.tictactoe(message)
    }
})