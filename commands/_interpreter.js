const roll = require("./roll");
const sos = require("./sos");
const mar = require("./mar");

module.exports = function (message) {

  //Commands ----------------------
  if (message.content.match(/^![^ \r\n]/)) { //you talking to the bot
    message.reply(message.content);

    var arguments = message.content.slice(1).split(/ +/);
    var command = arguments.shift();

    switch (command) {
      case "ping": //-----------------
        message.reply('Pong!');
        break;

      case "sos": //-----------------
        sos(message, arguments);
        break;

      case "mar": //-----------------
        mar(message, arguments);
        break;

      case "roll": //-----------------
        roll(message, arguments);
        break;

      default: //---------------------
        message.reply("I don't know the command : "+command)
    }
    message.delete();
  }
};
