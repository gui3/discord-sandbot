const rollDice = require("../helpers/rollDice");

module.exports = function (message, arguments) {

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
      if (ix > 0) {
        result = result /2
      }
      results.push({
        dice: dice,
        stat: stat,
        result: result
      });
    }
  });

  var reply = "\n";
  var sum = 0;

  results.forEach(res => {
    reply += res.stat+" dé:"+res.dice + " = "+res.result+"\n";
    sum += res.result;
  });

  if (critical.length > 0) {
    reply += "\nCritiques :"
    critical.forEach(c => {
      reply += "\n" + c.type + ":" + c.result + " ";
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

  message.reply(reply);

}
