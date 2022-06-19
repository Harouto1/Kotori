const Discord = require("discord.js")
const Command = require("../Structure/Command")

module.exports = new Command({

    name: "clearuser",
    description: "Allows you to delete a number of messages from a specific user",
    utilisation: "[membre] [number of posts]",
    permission: Discord.Permissions.FLAGS.MANAGE_MESSAGES,
    category: "⛔ Modération",
    cooldown: 0,

    async run(bot, message, args, db) {

        try {

            let user = message.user ? await bot.users.fetch(args._hoistedOptions[0].value) : (message.mentions.users.first() || await bot.users.fetch(args[0]))
            if(!user) return message.reply("No people found !")

            let number = message.user ? args._hoistedOptions[1].value : args[1];
            if(!number) return message.reply("Please enter a number between \`1\` et \`100\` inclus !")
            if(isNaN(number)) return message.reply("Please enter a number between \`1\` et \`100\` inclus !")
            if(parseInt(number) < 1 || parseInt(number) > 100) return message.reply("Please enter a number between \`1\` et \`100\` inclus !")

            await message.delete()

            try {

                let messages = [...(await message.channel.messages.fetch()).values()].filter(m => m.author.id === user.id).slice(0, parseInt(number));
                if(messages.length <= 0) return message.channel.send(`\`${user.tag}\` has not sent any messages in this room !`)

                let msg = await message.channel.bulkDelete(messages)

                await message.channel.send(`I deleted \`${msg.size}\` message(s) from \`${user.tag}\` with success !`)

            } catch (err) {

                let messages = [...(await message.channel.messages.fetch()).values()].filter(m => m.author.id === user.id && m.createdAt > (Date.now() - 1209600000)).slice(0, parseInt(number));
                if(messages.length <= 0) return message.channel.send(`\`${user.tag}\` hasn't posted any messages in this room in the last 14 days !`)

                let msg = await message.channel.bulkDelete(messages)

                await message.channel.send(` I deleted \`${msg.size}\` message(s) from \`${user.tag}\` because the others were more than 14 days old with success !`)
            }

        } catch (err) {

            return message.reply("No people found !")
        }
    }
})