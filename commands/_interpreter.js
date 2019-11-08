const sos = require("sos");
const roll = require("roll");

module.exports = function (message) {

  //Commands ----------------------
  if (message.content.match(/^![^ \r\n]/)) { //you talking to the bot
    var arguments = message.content.slice(1).split(/ +/);
    var command = arguments.shift();


    switch (command) {
      case "ping": //-----------------
        message.reply('Pong!');
        break;

      case "sos": //-----------------
        sos(message, arguments);
        break;

      case "roll": //-----------------
        roll(message, arguments);
        break;

      default: //---------------------
        message.reply("I don't know the command : "+command)
    }
  }
};
