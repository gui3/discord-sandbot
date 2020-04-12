module.exports = {
  name: "test",
  help: "utilise ce template pour faire des fonctions",
  ignorehelp: true,
  async: true,
  function: async function (arguments, message, debug) {
    // arguments est la liste de mots qui suivent la commande
    //   par exemple pour !roll 1d100, arguments = ["1d100"]
    // message est la référence envers le message discord qui a lancé la commande
    //   tu peux faire message.reply pour répondre au message et poster un texte

//    message.reply("j'ai bien compris_ma version")
//    message.reply("vous avez dit : " + arguments.join(" "))
    // Array.join 'colle' tous les éléments d'un Array avec le texte en argument
    try {
      message.delete();
    } catch (err) {
      console.error(err);
      return "cannot do"
    }
//    (node:15308) UnhandledPromiseRejectionWarning: DiscordAPIError: Missing Permissions
//    at E:\Fichiers\Vrac\Prog\atom1\discord-sandbot\node_modules\discord.js\src\client\rest\RequestHandlers\Sequential.js:85:15
//    at E:\Fichiers\Vrac\Prog\atom1\discord-sandbot\node_modules\snekfetch\src\index.js:215:21
//    at processTicksAndRejections (internal/process/task_queues.js:97:5)
// (node:15308) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing
// inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch().
// To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict`
// (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 2)
// (node:15308) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise
// rejections that are not handled will terminate the Node.js process with a non-zero exit code.

    debug.say("je suis en mode debug")
  }
};
