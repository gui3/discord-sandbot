const rollDice = require("../helpers/rollDice");

module.exports = {
  name: "sos",
  help: "Permet de lancer un combat en mode 1v plusieurs\n"+
    "!sos (stat ennemi 1) (stat ennemi 2) ...\n"+
    "ex: !sos 40 50 50",
  function: function (arguments) {
    var results = [];
    var ignored = [];
    var critical = [];
    var N = 0;  // nombre d'avdersaires
    var sum = 0;  // total du score de combat en cumulé

    arguments.forEach((arg, ix) => {
      var stat = parseFloat(arg);
      if (isNaN(stat)) {
        ignored.push(arg);
      } else {
        N++
        var dice = rollDice("1d100").sum;
        // gestion des critiques
        if (dice === 1) {
          critical.push({
            type: "-1d100",
            result: - rollDice("1d100").sum
          });
          var info_critiq = "  -> critique -1d100\n"
        } else if (dice === 100) {
          critical.push({
            type: "+1d100",
            result: rollDice("1d100").sum
          });
          var info_critiq = "  -> critique +1d100\n"
        } else if (dice < 6) {
          critical.push({
            type: "-1d20",
            result: - rollDice("1d20").sum
          });
          var info_critiq = "  -> critique -1d20\n"
        } else if (dice > 94) {
          critical.push({
            type: "+1d20",
            result: rollDice("1d20").sum
          });
          var info_critiq = "  -> critique +1d20\n"
        } else {
          var info_critiq = "\n"
        }
        var result = dice + stat;
        var modif = "";
        if (ix > 0) {
          result = result /2;
          modif = "/2";
        }
        results.push({
          dice: dice,
          stat: stat,
          result: result,
          modif: modif,
          info_critiq: info_critiq
        });
      }
    });

    var reply = "COMBAT en mode 1v" + N + "\n";

    results.forEach(res => {
      reply += res.stat + " + " + res.dice + " (d100) " +
                 res.modif + " = " + res.result + res.info_critiq;
      sum += res.result;
    });

    reply += "\n"  // saut de ligne

    if (critical.length > 0) {
      reply += "Prise en compte des critiques :\n"
      critical.forEach(c => {
        reply += c.type + " : " + c.result + " \n";
        sum += c.result;
      });
    }

    reply += "\n"  // saut de ligne

    if (ignored.length > 0) {
      reply += "(ignored arguments :";
      ignored.forEach(ign => {
        reply += " " + ign;
      })
      reply += ")\n"
    }
    reply += "\nRésultat cumulé : " + sum

    return reply;

  }
};
