module.exports = (diceString) => {
  var [dices, faces] = diceString.split("d").map(x => parseInt(x)),
    results = {
      dices: [],
      sum:0
    };

  for (var i = 0; i< dices; i++) {
    results.dices.push(Math.floor(Math.random()*faces+1));
  };

  results.sum = results.dices.reduce((a,b)=>a+b);

  return results
}
