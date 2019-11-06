const kick = require('../commands/kick')

module.exports = (client, message) => {

  if (message.content.match(/^![^ \r\n]/g)) { //you talking to the bot
    var words = message.content.slice(1).split(" ");
    var command = words.shift(),
      arguments = words

    if (message.content.match())
  }

  if (message.content === 'ping') {
    message.reply('Pong!')
  }

  else if (message.content.startsWith('!kick')) {
    return kick(message)
  }
}
