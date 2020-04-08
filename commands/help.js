module.exports = {
  name: "help",
  help: "Demander de l'aide sur le bot",
  ignorehelp: true,
  function: function (arguments, message) {
    let liste = true
    let reply = ""
    let prefix = message.guild.guildVars.prefix
    const commands = message.client.botVars.commands
    const keys = Object.keys(commands)
    arguments.forEach((arg) => {
      if (keys.includes(arg)) {
        // afficher aide complete de la fonction demandée
        liste = false
        const command = commands[arg]
        reply += "__Commande__ **" + prefix + command.name + "** :\n"
        reply += command.help ? command.help : "(pas d'aide sur cette commande...)"
        reply += "\n\n"
      } else {
        reply += "__Commande__ **" + prefix + arg + "** : inexistante\n\n"
      }
    })

    if (liste) {
      // afficher la liste des fonctions et un commentaire raccourci pour chacune
      reply += "__Liste des commandes disponibles :__\n"
      Object.keys(message.client.botVars.commands).forEach(key => {
        let command = message.client.botVars.commands[key];
        if (!command.ignorehelp) {
          reply += "**"+prefix+command.name+"** : "
          reply += command.shorthelp ? command.shorthelp : "(pas d'aide sur cette commande...)"
          reply += "\n"
        }
      });
      reply += "\nPour plus d'info, taper '!help nom_commande1 nom_commande2 etc...'\n"
    }

    return reply;
  }
};
