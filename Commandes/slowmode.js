const Discord = require("discord.js")
const Command = require("../Structure/Command")

module.exports = new Command({

    name: "slowmode",
    description: "Allows you to set the slowmode on the channel",
    utilisation: "slowmode <time> (to enable), slowmode <time> (to disable)",
    permission: Discord.Permissions.FLAGS.MANAGE_CHANNELS,
    category: "⛔ Modération",
    cooldown : 5,
    
    async run (client, message, args) {

      try { 

      
        const amount = parseInt(args[0]);
          if (isNaN(amount))
            return message.channel.send("numéro non valide");
        if (args[0] === amount + "s") {
          message.channel.setRateLimitPerUser(amount);
          if (amount > 1) {
            message.channel.send("slowmode est activer " + amount + " seconds");
            return;
          } else {
            message.channel.send("slowmode est activer " + amount + " second");
            return;
          }
        }
        if (args[0] === amount + "min") {
          message.channel.setRateLimitPerUser(amount * 60);
          if (amount > 1) {
            message.channel.send("slowmode est activer " + amount + " minutes");
            return;
          } else {
            message.channel.send("slowmode est activer " + amount + " minute");
          
            return;
          }
        }
        if (args[0] === amount + "h") {
          message.channel.setRateLimitPerUser(amount * 60 * 60);
          if (amount > 1) {
            message.channel.send("slowmode est activer " + amount + " hours");
            return;
          } else {
            message.channel.send("slowmode est activer " + amount + " hour");
            return;
          }
        } else {
          message.channel.send(
            "Vous pouvez uniquement régler les secondes (s), les minutes (min) et les heures (h)."
          );
        }
      } catch (err) {

        return message.reply(err);
      }
    }
  })
  