const loadMemo = require("../helpers/loadMemo");

module.exports = {
  name: "memo",
  help: "Donne les informations sur les armes et objets\n",
  function: (arguments, message) => {
    loadMemo(message)
    .then(memo => { // processing the memo -------------

      for (let sheet of Object.keys(memo.sheets) {
        message.reply(memo.sheets[sheet].data)
      }
      console.log(memo)
      
    })// ------------------------------------------------
    .catch(err => {
      message.reply("ERREUR : " + err.message)
    })

    return "je cherche le memo...";
  }
};
