module.exports = {
  name: "test",
  help: "utilise ce template pour faire des fonctions",
  function: function (arguments, message) {
    // arguments est la liste de mots qui suivent la commande
    //   par exemple pour !roll 1d100, arguments = ["1d100"]
    // message est la référence envers le message discord qui a lancé la commande
    //    tu peux faire message.reply pour répondre au message et poster un texte

    message.reply("j'ai bien compris")
    message.reply("vous avez dit : " + arguments.join(" "))
    // Array.join 'colle' tous les éléments d'un Array avec le texte en argument
  }
};
