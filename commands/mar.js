const test_sos = require("../helpers/test_sos");

module.exports = {
  name: "mar",
  shorthelp: "test de combat avec atout martyr",
  help: "Permet de lancer un combat contre plusieurs ennemis\n"+
    "pour un personnage possédant l'**atout martyr**\n"+
    "!mar (stat ennemi 1) (stat ennemi 2) ...\n"+
    "exple: !mar 40 50 50",
  function: function (arguments) {
    var reply = test_sos(arguments,"mar");
    return reply
  }
};
