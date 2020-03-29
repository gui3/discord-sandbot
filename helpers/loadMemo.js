const { GoogleSpreadsheet } = require('google-spreadsheet');


module.exports = async (message, debug) => {
  const fullLink = "https://docs.google.com/spreadsheets/d/1Bny-ZsCG_oUuS0nTbR-7tBBZu47_ncS9qGYaMpuprWU/edit#gid=0"
  const sheetId = "1Bny-ZsCG_oUuS0nTbR-7tBBZu47_ncS9qGYaMpuprWU"

  var loaded = {}

  debug.say("je me connecte à Google Sheets...")

  const doc = new GoogleSpreadsheet(sheetId);

  //doc.useApiKey(process.env.GOOGLE_API_KEY);
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_BOT_EMAIL,
    private_key: process.env.GOOGLE_BOT_PRIVATE_KEY.replace(/\\n/g, '\n'),
  });

  await doc.loadInfo();
  loaded.docTitle = doc.title;
  loaded.sheets = {};
  loaded.data = {};

  debug.say("...connection réussie, je récupère les infos...")

  // get the spreadsheets
  for (let s = 0; s < doc.sheetCount; ++s ) {
    const sheet = doc.sheetsByIndex[s];

    loaded.data[sheet.title] = {};
    loaded.data[sheet.title]["_RAW"] = []

    await sheet.loadCells();

    debug.say("...cellules chargées depuis " + sheet.title)

    let nullrow = 0;
    for (let row= 0; row < sheet.rowCount; ++row) {
      loaded.data[sheet.title]["RAW"].push([]);

      let nullcell = 0;
      for (let col = 0; col < sheet.columnCount; ++col) {
        let cell = sheet.getCell(row, col).value;
        loaded.data[sheet.title]["RAW"][row].push(cell)
        if (!cell) {
          ++nullcell;
        } else {
          nullcell = 0;
        }
        if (nullcell > 10) {
          break;
        }
      }
      if (nullcell == loaded.sheets[sheet.title].data[row].length) {
        ++nullrow
      }
      if (nullrow > 5) {
        break;
      }
    }

    debug.say("feuille " + sheet.title + " bien chargée !")
  }

  return loaded;
}
