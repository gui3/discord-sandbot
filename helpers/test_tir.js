const rollDice = require("./rollDice");

module.exports = (dist,modif,arme_x1,id_arme) => {

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

  // ----- lire dd en fonction de la distance ---------- (version precedente)
//  var ind = 0;  // indice lecture tableau
//  while (dist > dist_table[ind]) {
//    ind++;
//  }
//  // determination du dd pour une distance intermédiaire
//  if (ind >= 1) {
//    var dd = (dd_table[ind]-dd_table[ind-1])*(dist-dist_table[ind-1])/(dist_table[ind]-dist_table[ind-1])+dd_table[ind-1];
//    dd = Math.round(dd);
//  } else {
//    var dd = dd_table[0];
//  }

  // ----- determination dd de tir ---------- (fonction exponentielle)
  let [delta,y0,y1] = [1,5,50]
  let a = y1-y0-arme_x1*delta
  let b = 2.5/arme_x1
  let dd = Math.round(a*(1-Math.exp(-b*dist))+y0+delta*dist)

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
        reply += " entravante) ; ID(2) " + id_arme + "\n";
        break;
      case 4:
        reply += " grave) ; ID(4) " + 3*id_arme + "\n";
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
