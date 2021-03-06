const rollDice = require("../helpers/rollDice");

module.exports = {
  name: "roll",
  shorthelp: "Jet de dés d'une valeur",
  help: "Lance plusieurs dés d'une valeur\n"+
    "exple: *!roll 2d100* ou *!roll 10d20*",
  function: function (arguments) {

    var argument = arguments.join("");
    if (argument.match(/^(\d*d\d+)$/)) {
      var results = rollDice(argument);

      if (results.sum == 0) {
        return "Erreur de commande\n"
      }

      var reponse = "Tirage "+results.string
      if (results.dices.length > 1) {
        reponse += "\nRésultat : " + results.dices.join(", ")
        reponse += "\nTotal : **"+results.sum+"**\n";
//        reponse += "Moyenne : **"+results.mean+"**\n";
      } else {
        reponse += " : **"+results.dices+"**"
      }
      return reponse
    }
    else {
      return "Indique moi le dé a lancer comme ça : *!roll 2d20*\n"
    }
  }
};
