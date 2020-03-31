const test_tir = require("../helpers/test_tir");

module.exports = {
  name: "tir",
  help: "Test de tir sur cible fixe à la distance x à l'arme indiquée avec modificateur y\n  ex: !tir abc 30 44\n",
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
        if (
          Object.keys(process.externalData.dd_tir).includes(arme)
          && arme !== '_distance'
        ) {
          // extraire le tableau des dd "dd_tabl" en fonction de l'arme
          let dd_table = process.externalData.dd_tir[arme]['dd']
          let dist_table = process.externalData.dd_tir['_distance']['dd']
          // faire appel à test_tir
          debug.say('je lance le test de tir')
          message.reply(test_tir(dist,modif,dd_table,dist_table))
        } else {  // arme non reconnue
          listing = ''
          for (let weapon of Object.keys(process.externalData.dd_tir)) {
            if (weapon !== '_distance') {
              listing += weapon + " : " +
                process.externalData.dd_tir[weapon]['name'] +
                '\n'
            }
          }
          message.reply("Erreur: arme non valide\n  Armes disponibles:\n" + listing)
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
