module.exports = {
  name: "help",
  help: "demander de l'aide sur le bot",
  function: function (arguments, message) {
    let reply = "";
    let prefix = message.guild.guildVars.prefix;
    Object.keys(message.client.botVars.commands).forEach(command => {
      reply += "\n___ Commande "+prefix+command.name+" ___\n"+
        command.help ? command.help : "(pas d'aide sur cette commande ...)\n";
    });
    return reply;
  }
};
