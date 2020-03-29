const rollDice = require("../helpers/rollDice");

module.exports = {
  name: "roll",
  help: "Lance plusieurs dés d'une valeur\n"+
    "!roll 2d100\n"+
    "!roll 10d20",
  function: function (arguments) {

    var argument = arguments.join("");
    if (argument.match(/^(\d+d\d+)$/)) {
      var results = rollDice(argument);

      var reply = "Tirage "+argument
      reply += "\nRésultat : " + String(results.dices);
      if (results.dices.length > 1) {
        reply += "\nTotal : "+results.sum;
        reply += " ; Moyenne : "+results.mean;
      }

      return reply
    }
    else {
      return "Indique moi le dé a lancer comme ça : !roll 2d20";
    }
  }
};
