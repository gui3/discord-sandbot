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

      var reply = "rolled "+argument
      reply += "\nresult(s) : " + String(results.dices);
      if (results.dices.length > 1) {
        reply += "\nsum : "+results.sum;
      }

      return reply
    }
    else {
      return "indique moi le dé a lancer comme ça : !roll 2d20";
    }
  }
};
