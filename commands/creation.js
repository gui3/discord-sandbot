const rollDice = require("../helpers/rollDice");

module.exports = {
  name: "creation",
  shorthelp: "Création d'un personnage",
  help: "Tire les dés de Dons, Traits, points d'Aptitude et Social\n"+
    "pour création d'un personnage-joueur",
  function: function () {
    // Dons : 1d20 / 1d12 / 1d6
    var don1 = rollDice("1d20").sum
    var don2 = rollDice("1d12").sum
    var don3 = rollDice("1d6").sum
    // Traits : 5d20, garder le max, le min et le median
    var trait_vrac = rollDice("5d20").dices
    trait_tri = trait_vrac.sort((a,b)=>b-a)
    var trait1 = trait_tri[0]
    var trait2 = trait_tri[2]
    var trait3 = trait_tri[4]
    // points d'Aptitudes à répartir : 3 meilleurs sur 6d20
    var apt_vrac = rollDice("6d20").dices
    apt_tri = apt_vrac.sort((a,b)=>b-a)
    // if numbers are sorted as strings, "25" is bigger than "100", because "2" is bigger than "1"
    apt1 = apt_tri[0]+apt_tri[1]+apt_tri[2]
    // Social 2d20 (en négatif ou en positif)
    var social = rollDice("2d20")
    // affichage des résultats
    var reply = "**Dons :** "+don1+" (1d20) / "+don2+" (1d12) / "+don3+" (1d6)\n"
    reply += "**Traits :** "+trait1+" / "+trait2+" / "+trait3+" (5d20 : "+trait_tri+")\n"
    reply += "**Points d'Aptitudes :** "+apt1+" (6d20 : "+apt_tri+")\n"
    reply += "**Social** : +-"+social.sum+" (2d20 : "+social.dices+")"
    // fin de fonction
    return reply
  }
};
