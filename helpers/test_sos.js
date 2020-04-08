const rollDice = require("./rollDice");

module.exports = (arguments,type) => {

  // rajouter input 'mar' ou 'sos' et integrer l'affichage des resultats a cette fonction
  var results = [];
  var ignored = [];  // arguments qui ne sont pas reconnus comme des nombres
  var critical = [];
  var n = 0;  // nombre d'avdersaires
  var total = 0;
  var de_critiq = 0;

  arguments.forEach((arg, ix) => {
    var stat = parseFloat(arg);
    if (isNaN(stat)) {
      ignored.push(arg);
    } else {
      n++
      var dice = rollDice("1d100").sum;

      // gestion des critiques
      if (dice === 1) {
        critical.push({
          type: "-1d100",
          result: - rollDice("1d100").sum
        });
        var info_critiq = "   -> critique -1d100\n"
      } else if (dice === 100) {
        critical.push({
          type: "+1d100",
          result: rollDice("1d100").sum
        });
        var info_critiq = "   -> critique +1d100\n"
      } else if (dice < 6) {
        critical.push({
          type: "-1d20",
          result: - rollDice("1d20").sum
        });
        var info_critiq = "   -> critique -1d20\n"
      } else if (dice > 94) {
        critical.push({
          type: "+1d20",
          result: rollDice("1d20").sum
        });
        var info_critiq = "   -> critique +1d20\n"
      } else {
        var info_critiq = "\n"
      }
      var result = dice + stat;
      var modif = "";
      if (ix > 0 && type == "sos") {
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

// --------------------------------------------------
  switch (type) {
    case "sos":
      var reply = "COMBAT en mode 1v" + n + " sans atout Martyr\n"
      break;
    case "mar":
      var reply = "COMBAT en mode 1v" + n + " en mode Martyr\n"
      break;
  }

  results.forEach(res => {
    reply += res.stat + " + " + res.dice + " (d100) " +
              res.modif + " = " + res.result + res.info_critiq;
              total += res.result;
  });

  if (critical.length > 0) {
    reply += "\nPrise en compte des critiques :\n"
    critical.forEach(c => {
      reply += c.type + " : " + c.result + "\n";
      de_critiq += c.result;
    });
  }

  if (ignored.length > 0) {
    reply += "\n(ignored arguments :";
    ignored.forEach(ign => {
      reply += " " + ign;
    })
    reply += ")"
  }
  switch (type) {
    case "sos":
    total = total+de_critiq
      reply += "\nRésultat cumulé : **" + total + "**"
      break;
    case "mar":
      total = Math.round(total/n+de_critiq)
      if (critical.length > 0) {
        reply += "\nRésultat cumulé /" + n + " + dés critiques : **" + total + "**"
      } else {
        reply += "\nRésultat cumulé /" + n + " : **" + total + "**"
      }
      break;
    }

  return reply

};
