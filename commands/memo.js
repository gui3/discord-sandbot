const loadMemo = require("../helpers/loadMemo");

module.exports = {
  name: "memo",
  help: "Donne les informations sur les armes et objets\n",
  function: (arguments, message, debug) => {

    loadMemo(message, debug)
    .then(memo => { // processing the memo -------------

      for (let sheet of Object.keys(memo.sheets)) {
        message.reply(memo.sheets[sheet].data)
        .catch(
          err => debug.error("ERREUR : "+err.message)
        );
      }
      console.log(memo);

    })// ------------------------------------------------
    .catch(err => {
      debug.error("ERREUR : " + err.message)
    })

    return "je cherche le memo...";
  }
};
