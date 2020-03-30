const rollDice = require("../helpers/test_tir");

module.exports = {
  name: "tir",
  help: "ceci est un test",
  function: function (arguments) {
    var [arme, dist, modif] = arguments;
    if (parseInt(dist) >= 0 && typeof parseInt(modif) === "number") {
      if (parseInt(dist) <= 100) {

        // lire "arme" et en déduire un indice pour lecture du tableau des dd

        // extraire le tableau des dd "dd_tabl" en fonction de l'arme

        // faire appel à test_tir
        var reply = test_tir(dist,modif,dd_tabl).sum;
      } else {  // distance >100
        return "Distance trop grande, situation non prévue\n"
      }
    } else {  // échec lecture commande
      return "Commande non valide : (!abc distance modificteur)\n  ex: !abc 30 44"
  }
};
