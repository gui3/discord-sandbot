const loadSheets = require('../helpers/loadSheets')

module.exports = {
  name: "init",
  shorthelp: "À lancer en début de partie",
  help: "Charge les données externes (depuis une Google SpreadSheet) en début de partie",
  async: true,
  function: function (arguments, message, debug) {
    message.reply("Lancement de la partie et chargement des donnés\n")

    // loadSheets
    debug.say("je tente de charger la spreadsheet")
    loadSheets(message, debug)
      .then(stored => {
        if (stored) {
          debug.say(
            "j\'ai récupéré cette data :\n" +
            JSON.stringify(process.externalData)
          )
          message.reply("Data bien récupérée")
        }
      })
      .catch(err => debug.error(err))

    message.reply("Bienvenue dans " + message.guild.name +
                "\nLa partie est lancée\n")

    return
  }
};
