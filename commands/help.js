module.exports = {
  name: "help",
  help: "Demander de l'aide sur le bot",
  ignorehelp: true,
  function: function (arguments, message) {
    let prefix = message.guild.guildVars.prefix;
//    if (  ' Object.keys(process.externalData.dd_tir) '  .includes(arguments[0])) {
      // afficher aide complete de la fonction demandée
//    } else {
      // afficher la liste des fonctions et un commentaire raccourci pour chacune
      let reply = "__Liste des commandes disponibles :__\n";
      Object.keys(message.client.botVars.commands).forEach(key => {
        let command = message.client.botVars.commands[key];
        if (!command.ignorehelp) {
          reply += "**"+prefix+command.name+"** : ";
          reply += command.shorthelp ? command.shorthelp : "(pas d'aide sur cette commande...)";
          reply += "\n"
        }
      });
      reply += "\nPour plus d'info sur une commande, taper '!help nom_commande'\n"

//    }
    return reply;
  }
};
