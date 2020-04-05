const rollDice = require("../helpers/rollDice");

module.exports = {
  name: "mar",
  help: "Permet de lancer un combat en mode martyr\n"+
    "!mar (stat ennemi 1) (stat ennemi 2) ...\n"+
    "ex: !mar 40 50 50",
  ignorehelp: 0,
  function: function (arguments) {

    var results = [];
    var ignored = [];
    var critical = [];

    arguments.forEach((arg, ix) => {
      var stat = parseFloat(arg);

      if (isNaN(stat)) {
        ignored.push(arg);
      }
      else {
        var dice = rollDice("1d100").sum;
        if (dice === 1) {
          critical.push({
            type: "-1d100",
            result: - rollDice("1d100").sum
          });
        } else if (dice === 100) {
          critical.push({
            type: "1d100",
            result: rollDice("1d100").sum
          });
        } else if (dice < 6) {
          critical.push({
            type: "-1d20",
            result: - rollDice("1d20").sum
          });
        } else if (dice > 94) {
          critical.push({
            type: "1d20",
            result: rollDice("1d20").sum
          });
        }
        var result = dice + stat;
        results.push({
          dice: dice,
          stat: stat,
          result: result
        });
      }
    });

    var reply = "COMBAT en mode Martyr ___\n";
    var sum = 0;

    results.forEach(res => {
      reply += res.stat+" d100: "+res.dice +
        " = "+res.result+"\n";
      sum += res.result;
    });

    reply += "\nNombre d'ennemis (coeff diviseur) : " + results.length
    sum = sum/results.length;

    if (critical.length > 0) {
      reply += "\nTOTAL provisoire : " + sum
      reply += "\nCritiques :"
      critical.forEach(c => {
        reply += "\n" + c.type + " : " + c.result + " ";
        sum += c.result;
      });
    }

    if (ignored.length > 0) {
      reply += "\n(ignored arguments :";
      ignored.forEach(ign => {
        reply += " " + ign;
      })
      reply += ")"
    }
    reply += "\nresultat du fight : "+sum

    return reply;

  }
}
