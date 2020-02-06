const loadMemo = require("../helpers/loadMemo");

module.exports = {
  name: "memo",
  help: "Donne les informations sur les armes et objets\n"
  function: (arguments, message) => {
    loadMemo(message)
    .then(data => {
      message.reply(data);
    })
    .catch(err => {
      message.reply("ERREUR : " + err.message)
    })

    return "je cherche le memo...";
  }
};
