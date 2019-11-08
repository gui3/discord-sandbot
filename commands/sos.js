const rollDice = require("../helpers/rollDice");

module.exports = function (arguments) {

  var results = [];
  var ignored = [];
  var critical = [];

  arguments.forEach((arg, ix) => {
    var stat = parseFloat(arg);
    if (isNaN(stat)) {
      ignored.push(arg);
    } else {
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
      var modif = "";
      if (ix > 0) {
        result = result /2;
        modif = "/2";
      }
      results.push({
        dice: dice,
        stat: stat,
        result: result,
        modif: modif
      });
    }
  });

  var reply = "COMBAT en mode 1vsN ___\n";
  var sum = 0;

  results.forEach(res => {
    reply += res.stat+" d100: "+res.dice +
      " " + res.modif + " = "+res.result+"\n";
    sum += res.result;
  });

  if (critical.length > 0) {
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