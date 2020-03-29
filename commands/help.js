module.exports = {
  name: "help",
  help: "Demander de l'aide sur le bot ya a",
  function: function (arguments, message) {
    let reply = "";
    let prefix = message.guild.guildVars.prefix;
    Object.keys(message.client.botVars.commands).forEach(key => {
      let command = message.client.botVars.commands[key];
      if (command.name !== "help") {
        // cette commande est à modifier pour un test ignorehelp == true pour chaque fonction
        // créer variable (ou clée ?) ignorehelp pour chaque fonction
        reply += "\n___ Commande "+prefix+command.name+" ___\n";
        reply += command.help ? command.help : "(pas d'aide sur cette commande...)";
        reply += "\n";
      }
    });
    return reply;
  }
};
