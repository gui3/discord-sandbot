const { GoogleSpreadsheet } = require('google-spreadsheet');


module.exports = async (message) => {
  const fullLink = "https://docs.google.com/spreadsheets/d/1Bny-ZsCG_oUuS0nTbR-7tBBZu47_ncS9qGYaMpuprWU/edit#gid=0"
  const sheetId = "1Bny-ZsCG_oUuS0nTbR-7tBBZu47_ncS9qGYaMpuprWU"

  var loaded = {}

  if (message) {
    message.reply("je me connecte à Google Sheets...")
  }

  const doc = new GoogleSpreadsheet(sheetId);

  doc.useApiKey(process.env.GOOGLE_API_KEY);

  await doc.loadInfo();
  loaded.docTitle = doc.title;
  loaded.sheets = {};

  if (message) {
    message.reply("...connection réussie, je récupère les infos...")
  }

  // get the spreadsheets
  for (let s = 0; s < doc.sheetCount; ++s ) {
    const sheet = doc.sheetsByIndex[s];
    loaded.sheets[sheet.title] = {sheetReference:sheet};

    loaded.sheets[sheet.title].data = []

    for (let row= 0; row < sheet.rowCount; ++row) {
      loaded.sheets[sheet.title].data.push([])

      for (let col = 0; col < sheet.columnCount; ++col) {
        let cell = sheet.getCell(row, col).value;
        loaded.sheets[sheet.title].data[row].push(cell)
      }
    }

    if (message) {
      message.reply("feuille " + sheet.title + " bien chargée !")
    }
  }

  return loaded;
}
