const test_tir = require("../helpers/test_tir");
const dist_max = 150

module.exports = {
  name: "tir",
  shorthelp: "test de tir",
  help: "Test de tir sur cible fixe, selon distance et modificateur\n" +
          "!tir code_arme distance modificateur\n" +
          "exple: *!tir abc 30 44* -> tir a l'arbalete à 30 mètres avec modif de +44)\n" +
          "le modificateur peut être négatif, la distance doit être <" + dist_max + "\n" +
          "le code renvoie la valeur blessure et l'indicateur de dégâts de l'arme\n",
  function: function (arguments, message, debug) {
    if (!process.externalData) {
      message.reply("je n'ai pas les données pour le tir,\n"+
        "merci de lancer la commande *!loaddata*")
      return  // pour stopper la fonction
    }
    var [arme, dist, modif] = arguments
    if (parseInt(dist) >= 0 && typeof parseInt(modif) === "number") {
      if (parseInt(dist) <= dist_max) {
        // lire "arme"
        if (Object.keys(process.externalData.dd_tir).includes(arme) && arme !== '_distance') {
          // extraire le tableau des dd "dd_tabl" en fonction de l'arme
          //let dd_table = process.externalData.dd_tir[arme]['dd']
          //let dist_table = process.externalData.dd_tir['_distance']['dd']
          // extraire ID(2) de l'arme et variable x1 pour fonction de DD de tir
          let arme_id = process.externalData.dd_tir[arme]['id']
          let arme_x1 = process.externalData.dd_tir[arme]['x1']
          // faire appel à test_tir
          debug.say('je lance le test de tir')
          message.reply(test_tir(dist,modif,arme_x1,arme_id))
        } else {  // arme non reconnue
          listing = ''
          for (let weapon of Object.keys(process.externalData.dd_tir)) {
            if (weapon !== '_distance') {
              listing += weapon + " : " +
                process.externalData.dd_tir[weapon]['name'] + '\n'
            }
          }
          message.reply("Erreur: arme non valide\n  Armes disponibles:\n" + listing)
        }
      } else {  // distance >150
        message.reply("Distance trop grande, on ne peut pas viser à cette distance\n")
      }
    }
    else {  // distance ou modificateur non valide
      message.reply(
        "Commande non valide: (!tir code_arme distance modificteur)\n  ex: !tir abc 30 44\n"
      )
    }
  }
};
