const rollDice = require("../helpers/rollDice");

module.exports = function (message, arguments) {

  var results = [];
  var ignored = [];
  var critical = [];
  arguments.forEach((arg, ix) => {
    var stat = parseInt(arg);
    if (!(stat>0)) {
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

  var reply = "resultat du fight : "+sum+"\n";
  var sum = 0;

  results.forEach(res => {
    reply += res.stat+" dé:"+res.dice + " = "+res.result+"\n";
    sum += res.result;
  });

  if (critical.length > 0) {
    reply += "\nCritiques :"
    critical.forEach(c => {
      reply += c.type + ":" + c.result + " ";
      sum += c.result;
    });
    reply +="\n";
  }

  if (ignored.length > 0) {
    reply += "\nignored arguments :";
    ignored.forEach(ign => {
      reply += " " + ign;
    })
  }

  message.reply(reply);

}
