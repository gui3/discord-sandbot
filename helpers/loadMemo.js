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
  for (var i = 0; i < doc.sheetCount; ++i ) {
    const sheet = doc.sheetsByIndex[i];
    loaded.sheets[sheet.title] = {sheetReference:sheet};
    
    if (message) {
      message.reply("feuille " + sheet.title + " bien chargée !")
    }
  }

  return loaded;
}
