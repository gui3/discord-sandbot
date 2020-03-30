const test_tir = require("../helpers/test_tir");

module.exports = {
  name: "tir",
  help: "ceci est un test",
  function: function (arguments, message, debug) {
    if (!process.externalData) {
      message.reply("je n'ai pas les données pour le tir,\n"+
        "merci de lancer la commande !loadData"
      )
      return // pour stopper la fonction
    }
    var [arme, dist, modif] = arguments;
    if (parseInt(dist) >= 0 && typeof parseInt(modif) === "number") {
      if (parseInt(dist) <= 100) {
        // lire "arme"
        if (Object.keys(process.externalData.dd_tir).includes(arme)) {
          // extraire le tableau des dd "dd_tabl" en fonction de l'arme
          let dd_table = process.externalData.dd_tir[arme]
          let dist_table = process.externalData.dd_tir['_distance']
          // faire appel à test_tir
          debug.say('je lance le test de tir')
          message.reply(test_tir(dist,modif,dd_table,dist_table))
        } else {  // arme non reconnue
          message.reply("Erreur: arme non valide\nArmes: ...\n")
        }
      } else {  // distance >100
        message.reply("Distance trop grande, situation non prévue\n")
      }
    }
    else {  // distance ou modificateur non valide
      message.reply(
        "Commande non valide: (!tir code_arme distance modificteur)\n  ex: !tir abc 30 44\n"
      )
    }
  }
};
