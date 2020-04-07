const rollDice = require("../helpers/test_sos");

module.exports = {
  name: "sos2",
  help: "Permet de lancer un combat en mode 1v plusieurs\n"+
    "!sos (stat ennemi 1) (stat ennemi 2) ...\n"+
    "ex: !sos 40 50 50",
  function: function (arguments) {

    var total = 0;  // total du score de combat en cumulé

    var [results,ignored,critical,n] = test_sos(arguments);

//    var n = test_sos(arguments);
//    var n = 2
//    var n = rollDice("1d100").sum

//    var results = []
//    results.push({
//      dice: 23,
//      stat: 40,
//      result: 73,
//      modif: 1,
//      info_critiq: " critique!"
//    });
//    var ignored = []
//    var critical = []

//    message.reply("COMBAT en mode 1v" + n + " sans atout Martyr\n") ça, ça ne marche absolument pas !!!
    var reply = "COMBAT en mode 1v" + n + " sans atout Martyr\n"
    return reply

    results.forEach(res => {
      reply += res.stat + " + " + res.dice + " (d100) " +
                 res.modif + " = " + res.result + res.info_critiq;
      total += res.result;
    });

    if (critical.length > 0) {
      reply += "\nPrise en compte des critiques :"
      critical.forEach(c => {
        reply += "\n" + c.type + " : " + c.result + " ";
        total += c.result;
      });
    }

    if (ignored.length > 0) {
      reply += "\n(ignored arguments :";
      ignored.forEach(ign => {
        reply += " " + ign;
      })
      reply += ")"
    }
    reply += "\n"
    reply += "\nRésultat cumulé : " + total

    return reply

  }
};
