const loadMemo = require("../helpers/loadMemo");

module.exports = {
  name: "memo",
  help: "Donne les informations sur les armes et objets\n",
  function: (arguments, message) => {
    loadMemo(message)
    .then(memo => {
      message.reply(data);
      console.log(memo)
    })
    .catch(err => {
      message.reply("ERREUR : " + err.message)
    })

    return "je cherche le memo...";
  }
};
