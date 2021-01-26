module.exports = (diceString) => {
  var [dices, faces] = diceString.split("d").map(x => parseInt(x));
  // dices = nbe de dés à jeter
  // faces = nbe de faces du dé
  var results = {
      string: diceString,
      dices: [],
      sum:0,
      mean:0
    };

  if ( faces == 0 || faces == 1 ) {
    return results
  } else {

    if ( dices ) {
      // do nothing
    } else {
      dices = 1
      results.string = "1d"+faces
    }

    for (var i = 0; i< dices; i++) {
      results.dices.push(Math.floor(Math.random()*faces+1));
    };

    results.sum = results.dices.reduce((a,b)=>a+b);
    results.mean = Math.round(results.sum/results.dices.length);

    return results
  }
}
