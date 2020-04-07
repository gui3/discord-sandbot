const test_sos = require("../helpers/test_sos");

module.exports = {
  name: "sos",
  help: "Permet de lancer un combat en mode 1v plusieurs\n"+
    "!sos (stat ennemi 1) (stat ennemi 2) ...\n"+
    "ex: !sos 40 50 50",
  function: function (arguments) {
    var reply = test_sos(arguments,"sos");
    return reply
  }
};
