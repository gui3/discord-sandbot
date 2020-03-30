const { google } = require('googleapis');


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
    range: 'dd_tir!A:N',
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
          DICTIONNAIRE.dd_tir[row[0]] = row.slice(1).map(cell => parseFloat(cell))
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
