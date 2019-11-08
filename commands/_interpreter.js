const roll = require("./roll");
const sos = require("./sos");
const mar = require("./mar");
const play = require("./play");

module.exports = function (message, client) {

  //Commands ----------------------
  if (message.content.match(/^![^ \r\n]/)) { //you talking to the bot
    var arguments = message.content.slice(1).split(/ +/);
    var command = arguments.shift();

    var reply = "command " + message.content + " :\n"

    switch (command) {
      case "ping":
        reply += 'Pong!';
        break;

      case "sos":
        reply += sos(arguments);
        break;

      case "mar":
        reply += mar(arguments);
        break;

      case "roll":
        reply += roll(arguments);
        break;

      case "play":
        reply += play(arguments)
        break;

      case "stop":
        reply += stop(arguments)
        break;

      case "vartest":
        reply =+ "client.playing = " + client.playing;
        client.playing += 1;
        break;

      default: //---------------------
        reply += "I don't know the command : "+command;
    }
    message.delete();
    message.reply(reply);
  }
  else if (message.content.match(/OUI OU MERDE/i)) { // outil décisionnel
    message.reply(["OUI","OUI","OUI",
      "MERDE","MERDE","MERDE",
      "ZBRADARALDJAN"]
      [Math.floor(Math.random() * 7)]);
  };
};
