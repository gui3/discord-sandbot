const rollDice = require("../helpers/rollDice");

module.exports = {
  name: "calc",
  help: "Calcul avec jets de dés" +
    "\npar ex: 1d40 +5 /2d20",
  ignorehelp: 0,
  function: function (arguments) {
    var results = [];
    var argumentString = arguments.join(" ");
    var calcString = argumentString;
    var diceRex = /\d+d\d+/;
    while (calcString.match(diceRex)) {
      var dice = calcString.match(diceRex)[0];
      var diceResult = rollDice(dice);
      results.push(diceResult);
      calcString = calcString.replace(dice, diceResult.sum);
    }
    var result;
    if (!calcString.match(/^[ \d\.+-/*\(\)]+$/)) {
      return "Calcul invalide, essayerais tu de me hacker ?";
    }
    else {
      result = eval(calcString);
    }
    var reply = "";
    if (results.length > 0) {
      reply += "Resultats des dés :";
      results.forEach(r => {
        reply += "\n" + r.string +" : "+r.dices
      })
      reply += "\nCalcul intermédiaire : "+calcString + "\n";
    }
    reply += "Resultat : "+ result;

    return reply;
  }
};
