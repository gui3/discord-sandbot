module.exports = (diceString, precision=1) => {
  var [dices, faces] = diceString.split("d").map(x => parseInt(x));
  var results = {
      string: diceString,
      dices: [],
      sum:0,
      mean:0
    };

  for (var i = 0; i< dices; i++) {
    results.dices.push(Math.floor(Math.random()*faces+1));
  };

  results.sum = results.dices.reduce((a,b)=>a+b);

  var power = 10**precision;
  results.mean = Math.round(results.sum/results.dices.length*power)/power;

  return results
}
