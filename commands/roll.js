const rollDice = require("../helpers/rollDice");

module.exports = {
  name: "roll",
  help: "Lance le multidé indiqué\n"+
    "!roll 2d100\n"+
    "!roll 9d24",
  function: function (arguments) {

    var argument = arguments.join("");
    if (argument.match(/^(\d+d\d+)$/)) {
      var results = rollDice(argument);

      var reply = "tirage "+argument
      reply += "\nrésultat : " + String(results.dices);
      if (results.dices.length > 1) {
        reply += "\ntotal : "+results.sum;
        reply += " ; moyenne : "+results.mean;
      }

      return reply
    }
    else {
      return "indique moi le dé a lancer comme ça : !roll 2d20";
    }
  }
};
