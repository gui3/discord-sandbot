const test_tir = require("../helpers/test_tir")
const liste_arme_tir = require("../helpers/liste_arme_tir")
const dist_max = 150  // distance maximum de tir autorisee

module.exports = {
  name: "tir",
  shorthelp: "Test de tir",
  help: "Test de tir sur cible fixe, selon distance et modificateur\n" +
          "!tir (code_arme) distance modificateur\n" +
          "exple: *!tir 30 44* ou *!tir abc 30 44* -> cible à 30 m avec modif de +44\n" +
          "le modificateur peut être négatif, la distance doit être <" + dist_max + "\n" +
          "le code renvoie la valeur blessure - code_arme est un argument optionnel\n" +
          "si il est precisé, l'indicateur de dégâts de l'arme est donné\n",
  function: function (arguments, message, debug) {
    var reponse = ""
    if (!process.externalData) {
      reponse += "Je n'ai pas les données pour le tir,\n" +
                  "merci de lancer la commande *!init*"
      return reponse // pour stopper la fonction
    }

    var [arme,arg1,arg2] = arguments
    var arme_id = -1
    if (Object.keys(process.externalData.dd_tir).includes(arme) && arme !== 'code_arme') {
      // 1er argument reconnu comme une arme valide : on extrait son ID(2)
      arme_id = process.externalData.dd_tir[arme]['id']
      var dist = arg1
      var modif = arg2
    }
    else {  // code_arme n'est pas valide
      if (isNaN(1*arme)) {  // et ce n'est pas un nombre : c'est une erreur de code_arme
        reponse += "Erreur: arme non valide\n" + liste_arme_tir()
        return reponse }
      else {  // mais c'est un nombre => le prendre comme distance
        var dist = arme
        var modif = arg1 }
    }

    if (1*dist >= 0 && 1*dist <= dist_max) {
      if (isNaN(1*modif)) {
        reponse += "Modificateur de Tir non valide\n" +
                    "Commande: !tir code_arme distance modificteur\n"
      } else {
        // lancer le test de Tir
        debug.say('je lance le test de tir')
        reponse += test_tir(dist,modif,arme_id)
      }
    } else {
      reponse += "Distance non valide : 0 < distance < " + dist_max + "\n" +
                  "Commande: !tir code_arme distance modificteur\n"
    }
    return reponse
  }
};
