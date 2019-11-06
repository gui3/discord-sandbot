module.exports = (string) => {
  var [dices, faces] = string.split("d").map(x => parseInt(x)),
    result = {
      dices: [],
      sum:0
    };

  for (var i = 0; i< dices; i++) {
    results.dices.push(Math.floor(Math.random()*faces+1));
  };

  results.sum = results.dices.reduce((a,b)=>a+b);

  return reply
}
