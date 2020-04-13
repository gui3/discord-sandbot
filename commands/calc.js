const rollDice = require("../helpers/rollDice");

module.exports = {
  name: "calc",
  shorthelp: "calcul avec jets de dés",
  help: "Calcul (+ - * /) avec jets de dés et nombres\n" +
        "exple: *1d40 +5 /2d20*",
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
    var reponse = "";
    if (results.length > 0) {
      reponse += "Resultats des dés :"
      results.forEach(r => {
        reponse += "\n" + r.string +" : "+r.dices
      })
      reponse += "\nCalcul intermédiaire : "+calcString + "\n";
    }
    reponse += "Resultat : **"+ result + "**";

    return reponse
  }
};
