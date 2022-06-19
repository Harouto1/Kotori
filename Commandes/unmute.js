const Discord = require("discord.js")
const Command = require("../Structure/Command")

module.exports = new Command({

    name: "unmute",
    description: "Allows to render the speech of a user",
    utilisation: "[membre] (raison)",
    permission: Discord.Permissions.FLAGS.MODERATE_MEMBERS,
    category: "⛔ Modération",
    cooldown: 5,

    async run(bot, message, args, db) {

        let user = message.user ? bot.users.cache.get(args._hoistedOptions[0].value) : (message.mentions.users.first() || bot.users.cache.get(args[0].value));
        if(!user) return message.reply("No people found !")

        let reason = message.user ? args._hoistedOptions.length > 1 ? args._hoistedOptions[1].value : undefined : args.slice(1).join(" ")
        if(!reason) reason = "No reason given";

        if(message.user === undefined ? (user.id === message.author.id) : (user.id === message.user.id)) return message.reply("You can't make your own word !")
        if(user.id === message.guild.ownerId) return message.reply("You can't make this person's word !")
        if(message.member.roles.highest.comparePositionTo(message.guild.members.cache.get(user.id).roles.highest) <= 0) return message.reply("You can't make this person's word !")
        if(!message.guild.members.cache.get(user.id).isCommunicationDisabled()) return message.reply("This person already has his word !")

        try {
            await user.send(`${message.user === undefined ? message.author.tag : message.user.tag} gave you back your word on the server ${message.guild.name} for the reason ${reason} with success !`)
        } catch (err) {}

        await message.reply(`${message.user === undefined ? message.author : message.user} gave the floor of ${user.tag} for the reason ${reason} with success !`)

        message.guild.members.cache.get(user.id).timeout(null, `${reason} (Word delivered by ${message.user === undefined ? message.author.tag : message.user.tag})`)
    }
})