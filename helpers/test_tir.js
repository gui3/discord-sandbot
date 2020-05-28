const rollDice = require("./rollDice");

module.exports = (dist,modif,id_arme) => {

  // preambule : tableau des valeurs-blessure
  var id_table = [2,2,2,4,4,4,5,5,6,6];

  var reply = "";

  // tirage du d100
  var score_de = rollDice("1d100").sum;
  // résultat du test de tir
  var score_tir = score_de + parseInt(modif);
  reply += "Résultat du test: " + score_tir + " (dé=" + score_de + ")\n";
  // gestion des critiques
  if (score_de < 6) {
    reply += " -> Échec critique :red_circle:\n";
  } else if (score_de > 95) {
    reply += " -> Succès critique :green_circle:\n";
  }

  // ----- determination dd de tir ---------- (fonction exponentielle)
  let delta = 1   // taux d'accroissement lineaire du dd au delà de x1
  let y0 = 7      // dd distance de 1 metre
  let x1 = 15
  let y1 = 50     // dd cible a distance x1
  let b = 3.0     // parametre d'exponentielle
  let a = y1-delta*(x1-1)-y0
  let dd = Math.round(a*(1-Math.exp(-b*(dist-1)/(x1-1)))+delta*(dist-1)+y0)

  reply += "Degré de difficulté: " + dd + "\n";
  // analyse du resultat
  if (score_tir >= dd) {  // reussite du tir
    var reussite = score_tir - dd;
    reply += "**Tir réussi** (DD dépassé de " + reussite + ")\n";
    // division euclidienne pour obtenir le chiffre des dizaines (ne pas depasser la taille du tableau)
    var dizaine = Math.min(Math.floor(reussite/10) , id_table.length-1);
    var inddegats = id_table[dizaine]
    reply += "Valeur blessure: " + inddegats + " (blessure ";
    // indication textuelle type de blessure
    switch(inddegats) {  // precision de l'indic degats adapte de l'arme si besoin
      case 2:
        reply += " entravante)";
        if (id_arme !== -1) {reply += " => ID(2) " + 1*id_arme + "\n"}  else {reply += "\n"}
        break;
      case 4:
        reply += " grave)";
        if (id_arme !== -1) {reply += " => ID(4) " + 3*id_arme + "\n"} else {reply += "\n"}
        break;
      case 5:
        reply += " mortelle)\n";
        break;
      case 6:
        reply += " fatale)\n";
        break;
    }
  } else {  // echec du tir
    reply += "**Échec du tir**\n";
  }
  return reply
};
