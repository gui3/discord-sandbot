module.exports = {
  name: "help",
  help: "Demander de l'aide sur le bot ya a",
  ignorehelp: true,
  function: function (arguments, message) {
    let reply = "";
    let prefix = message.guild.guildVars.prefix;
    Object.keys(message.client.botVars.commands).forEach(key => {
      let command = message.client.botVars.commands[key];
      if (command.ignorehelp) {
        reply += "\n___ Commande "+prefix+command.name+" ___\n";
        reply += command.help ? command.help : "(pas d'aide sur cette commande...)";
        reply += "\n";
      }
    });
    return reply;
  }
};
