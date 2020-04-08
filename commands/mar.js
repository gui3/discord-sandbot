const test_sos = require("../helpers/test_sos");

module.exports = {
  name: "mar",
  shorthelp: "test de combat avec atout martyr",
  help: "Permet de lancer un combat en mode 1v plusieurs\n"+
    "si le personnage possède l'atout martyr\n"+
    "!sos (stat ennemi 1) (stat ennemi 2) ...\n"+
    "exple: !mar 40 50 50",
  function: function (arguments) {
    var reply = test_sos(arguments,"mar");
    return reply
  }
};
