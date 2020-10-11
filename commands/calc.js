const rollDice = require("../helpers/rollDice");

module.exports = {
  name: "calc",
  shorthelp: "Calcul avec jets de dés",
  help: "Calcul (+ - * /) avec jets de dés et nombres\n" +
        "exple: *1d40 +5 /2d20*",
  function: function (arguments) {
    var precision = 2   // nombre de chiffres apres la virgule
    var power = 10**precision;
    var results = []
    var reponse = ""
    var total
    var calcString = arguments.join(" ")
//    var diceRex = /\d+d\d+/
    var diceRex = /\d*d\d+/    // version modifié par Corentin
    // \d : Correspond à un nombre
    // + : Correspond à l'expression précédente qui est répétée une ou plusieurs fois
    // * : Correspond à l'expression précédente qui est répétée 0 ou plusieurs fois
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
      // ^ : Correspond au début de la séquence
      // $ : Correspond à la fin de la séquence
      // . : Correspond à n'importe quel caractère excepté un caractère de saut de ligne
      return "Calcul invalide, essayerais tu de me hacker ?";
    }
    else {
      total = Math.round(eval(calcString)*power)/power;

      if (results.length > 0) {
        reponse += "Résultats des dés :"
        results.forEach(r => {
          reponse += "\n" + r.string + " : " + r.dices
          if (r.dices.length > 1) {
            reponse += " (="+ r.sum + ")"
          }
        })
        reponse += "\nCalcul intermédiaire : "+calcString+"\n";
        reponse += "Résultat : **"+ total + "**\n";
        return reponse
      } else {
        return "Commande vide"
      }
    }
  }
};
