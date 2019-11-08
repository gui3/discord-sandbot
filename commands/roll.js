const rollDice = require("../helpers/rollDice");

module.exports = function (arguments) {

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
    return "Tell me the dice(s) to roll like that : !roll 2d20";
  }
}
