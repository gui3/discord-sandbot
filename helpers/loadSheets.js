const { google } = require('googleapis');

//-----------------------------------------------------
// récupère des données sauvées sur un Google Sheets
// pour être exploitées par d'autres fonctions
//-----------------------------------------------------

module.exports = async (message, debug) => {
  const fullLink = "https://docs.google.com/spreadsheets/d/1Bny-ZsCG_oUuS0nTbR-7tBBZu47_ncS9qGYaMpuprWU/edit#gid=0"
  const sheetId = '1Bny-ZsCG_oUuS0nTbR-7tBBZu47_ncS9qGYaMpuprWU'
  const sheetName = 'dd_tir'

  var loaded = {}

  debug.say("je me connecte à Google Sheets...")

  const googleSheets = google.sheets({
    version: 'v4',
    auth: process.env.GOOGLE_API_KEY
  })

  return googleSheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: 'dd_tir!A:P',  // taille de la table sur le doc GoogleSheets
  })
   .then((res) => {
      const rows = res.data.values;
      if (rows.length) {
        debug.say('data found !')
        DICTIONNAIRE = {
          dd_tir: {}
        }
        for (let i = 0; i < rows.length; i++) {
          let row = rows[i]
          //debug.say('chargement de la ligne ' + i)
          DICTIONNAIRE.dd_tir[row[0]] = {
            // en vrai, je peux modifier la sheet Google pour adapter ce que je veux
            name: row[1],  // deuxieme colonne, donc colonne 'B'
            id: row[2],  // troisieme colonne, donc 'C'
            x1: row[3],  // colonne D
            //dd: row.slice(4).map(cell => parseFloat(cell)) partie du tableau inutile
          }
        }
        debug.say(JSON.stringify(DICTIONNAIRE))
        process.externalData = DICTIONNAIRE
        return true
      } else {
        debug.say('No data found.')
        return false
      }
    })
    .catch(err => debug.say('erreur : ' + err.message))
}
