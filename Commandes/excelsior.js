const Discord = require("discord.js")
const Command = require("../Structure/Command")

module.exports = new Command({

    name: "excelsior",
    description: "Allows to delete all the messages of a channel WARNING To be used only if necessary operation not irreversible ",
    utilisation: "excelsior",
    permission: Discord.Permissions.FLAGS.ADMINISTRATOR,
    category: "⛔ Modération",
    cooldown : 0,

    async run(bot, message, args, db) {

        await message.channel.send({ content : " ** [ ▉ ▉ * * * * * * * * * ] 20% Well, how about we start...**"});{
            await message.channel.send({ content : " ** [ ▉ ▉ ▉ ▉ * * * * * * * ] 40% Camael.** "});{
                await message.channel.send({ content : "** [ ▉ ▉ ▉ ▉ ▉ ▉ * * * * * ] 60% Megiddo ! ** "});{
                    await message.channel.send({ content : "** [ ▉ ▉ ▉ ▉ ▉ ▉ ▉ ▉ * * ] 80% Gungnir ! ** "});{
                        await message.channel.send({ content : " ** [ ▉ ▉ ▉ ▉ ▉ ▉ ▉ ▉ ▉ ▉ ] 100% FIRE ! ** "});
                    }
                }
            }
        }

        
        

        message.channel.clone().then
        ((ch) => {
            ch.setParent(message.channel.parent);
            ch.setPosition(message.channel.position);

            message.channel.delete().then(() => {
            
                ch.send("This is what the Excelsior is worth https://i.pinimg.com/originals/3d/d7/30/3dd730224059b8d474f8db675fc87008.gif ")
            })

        });
}
})

//  https://i.pinimg.com/originals/3d/d7/30/3dd730224059b8d474f8db675fc87008.gif