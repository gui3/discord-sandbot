const loaddata = require("./loaddata");

// ne marche pas

module.exports = {
  name: "init",
  shorthelp: "à lancer en début de partie",
  help: "...",
  function: function () {
    reponse = "Lancement de la partie et chargement des donnés\n"
    loaddata()
    reponse += "Bienvenue dans " + message.guild.name +
                "\nLa partie est lancée\n"
    return reponse
  }
};
