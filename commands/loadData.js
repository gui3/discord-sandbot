const loadSheets = require('../helpers/loadSheets')

module.exports = {
  name: "loadData",
  help: "Charge les données externes (depuis une Google SpreadSheet)",
  ignorehelp: true,
  function: function (arguments, message, debug) {
    debug.say("je tente de charger la spreadsheet")
    loadSheets(message, debug)
      .then(stored => {
        if (stored) {
          debug.say(
            'j\'ai récupéré cette data :\n' +
            JSON.stringify(process.externalData)
          )
          message.reply('data bien récupérée')
        }
      })
      .catch(err => debug.error(err))

  }
};
