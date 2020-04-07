const rollDice = require("./rollDice");

module.exports = (arguments) => {

  // rajouter input 'mar' ou 'sos' et integrer l'affichage des resultats a cette fonction
  var results = [];
  var ignored = [];  // arguments qui ne sont pas reconnus comme des nombres
  var critical = [];
  var n = 0;  // nombre d'avdersaires

//  return n

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

  return [results,ignored,critical,n]
//  return n
};
