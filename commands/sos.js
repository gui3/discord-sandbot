const test_sos = require("../helpers/test_sos");

module.exports = {
  name: "sos",
  shorthelp: "Test de combat contre plusieurs ennemis",
  help: "Permet de lancer un combat contre plusieurs ennemis\n"+
    "!sos (stat ennemi 1) (stat ennemi 2) ...\n"+
    "exple: *!sos 40 50 50*\n"+
    "si le PJ a l'atout martyr, utiliser *!mar* à la place",
  function: function (arguments,message) {
    return test_sos(arguments,"sos",message)
  }
};
