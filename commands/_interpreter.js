const roll = require("./roll");
const sos = require("./sos");
const mar = require("./mar");

module.exports = function (message) {

  //Commands ----------------------
  if (message.content.match(/^![^ \r\n]/)) { //you talking to the bot
    var arguments = message.content.slice(1).split(/ +/);
    var command = arguments.shift();

    var reply = "command " + message.content + " :\n"

    switch (command) {
      case "ping": //-----------------
        reply += 'Pong!';
        break;

      case "sos": //-----------------
        reply += sos(arguments);
        break;

      case "mar": //-----------------
        reply += mar(arguments);
        break;

      case "roll": //-----------------
        reply += roll(arguments);
        break;

      default: //---------------------
        reply += "I don't know the command : "+command;
    }
    message.delete();
    message.reply(reply);
  }
  else if (message.content.match(/OUI OU MERDE/)) { // outil décisionnel
    message.reply(["OUI","OUI","OUI",
      "MERDE","MERDE","MERDE",
      "ZBRADARALDJAN"]
      [Math.floor(Math.random() * 7)]);
  };
};
