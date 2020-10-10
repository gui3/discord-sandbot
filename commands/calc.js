const rollDice = require("../helpers/rollDice");

module.exports = {
  name: "calc",
  shorthelp: "Calcul avec jets de dés",
  help: "Calcul (+ - * /) avec jets de dés et nombres\n" +
        "exple: *1d40 +5 /2d20*",
  function: function (arguments) {
    var precision = 2   // nombre de chiffres apres la virgule
    var results = []
    var reponse = ""
    var calcString = arguments.join(" ")
//    var diceRex = /\d+d\d+/
    var diceRex = /\d*d\d+/    // version modifié par Corentin
    // + : Correspond à l'expression précédente qui est répétée une ou plusieurs fois
    // ? : Correspond à l'expression précédente qui est présente une fois ou pas du tout
    // * : Correspond à l'expression précédente qui est répétée 0 ou plusieurs fois
    // \d : Correspond à un nombre
    // ^ : Correspond au début de la séquence
    // . : Correspond à n'importe quel caractère excepté un caractère de saut de ligne
    // ici je mets '*' au lieu du '+' => si il n'y a aucun chiffre avant
    // avant le 'd', le prog ajoutera automatiquement un '1'
    // 'd100' est traité comme '1d100'
    while (calcString.match(diceRex)) {
      var dice = calcString.match(diceRex)[0];
      var diceResult = rollDice(dice);
      results.push(diceResult);
      calcString = calcString.replace(dice, diceResult.sum);
    }
    if (!calcString.match(/^[ \d\.+-/*\(\)]+$/)) {
      return "Calcul invalide, essayerais tu de me hacker ?";
    }
    else {
      result = eval(calcString);
    }
    if (results.length > 0) {
      reponse += "Résultats des dés :"
      results.forEach(r => {
        reponse += "\n" + r.string +" : "+r.dices
      })
      reponse += "\nCalcul intermédiaire : "+calcString+"\n";
    }

    var power = 10**precision;
    result = Math.round(result*power)/power;
    reponse += "Résultat : **"+ result + "**\n";
    return reponse
  }
};
