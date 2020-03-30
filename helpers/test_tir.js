const rollDice = require("./rollDice");

module.exports = (dist,modif,dd_table) => {

  // préambule
  // tableau des distances
  var dist_table = new Array(0, 2, 5,10,15,20,25,30,40,50,60,80, 100);
  // tableau des degrés de difficulté pour l'arba de chasse
//  var dd_table   = new Array(5,10,18,26,34,42,50,55,65,75,85,105,125);
  // tableau des blessures
  var id_table = new Array(2,2,2,4,4,4,5,5,6,6);

  var reply = "";

  // tirage du d100
  var score_de = rollDice("1d100").sum;
  // résultat du test de tir
  var score_tir = score_de + parseInt(modif);
  reply += "Résultat du test: " + score_tir + " (dé=" + score_de + ")\n";
  // gestion des critiques
  if (score_de < 6) {
    reply += "Échec critique\n";
  } else if (score_de > 95) {
    reply += "Succès critique\n";
  }
  // lire dd en fonction de la distance
  var ind = 0;  // indice lecture tableau
  while (dist > dist_table[ind]) {
    ind++;
  }
  // détermination du dd pour une distance intermédiaire
  if (ind >= 1) {
    var dd = (dd_table[ind]-dd_table[ind-1])*(dist-dist_table[ind-1])/(dist_table[ind]-dist_table[ind-1])+dd_table[ind-1];
    dd = Math.round(dd);
  } else {
    var dd = dd_table[0];
  }
  reply += "Degré de difficulté: " + dd;
  // analyse du résultat
  if (score_tir >= dd) {  // réussite du tir
    var reussite = score_tir - dd;
    reply += " (dépassé de " + reussite + ")\n";
    // division euclidienne pour obtenir le chiffre des dizaines (ne pas dépasser la taille du tableau)
    var dizaine = Math.min(Math.floor(reussite/10) , 9);
    var inddegats = id_table[dizaine]
    reply += "Valeur blessure: " + inddegats + " (blessure ";
    // indication textuelle type de blessure
    switch(inddegats) {
      case 2:
        reply += " entravante)\n";
        break;
      case 4:
        reply += " grave)\n";
        break;
      case 5:
        reply += " mortelle)\n";
        break;
      case 6:
        reply += " fatale)\n";
        break;
    }
  }
  return reply
};
