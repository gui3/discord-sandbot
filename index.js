const Discord = require('discord.js')
require('dotenv').config()
const fs = require('fs')

const client = new Discord.Client()

// fs.readdir('./events/', (err, files) => {
//   files.forEach(file => {
//     const eventHandler = require(`./events/${file}`)
//     const eventName = file.split('.')[0]
//     client.on(eventName, (...args) => eventHandler(client, ...args))
//   })
// })

// READY -------------------------------------
client.on("ready", client => {
  console.log(`Logged in !`)
});


// MESSAGES & COMMANDS -----------------------
client.on("message", (client, message) => {
  message.reply("message recieved!");

  //Commands
  if (message.content.match(/^![^ \r\n]/)) { //you talking to the bot
    var arguments = message.content.slice(1).split(/ +/);
    var command = arguments.shift();

    switch (command) {
      case "ping": //-----------------
        message.reply('Pong!');
        break;
      case "roll": //-----------------
        var argument = arguments.join("");
        if (argument.match(/^(\d+d\d+)$/)) {
          var [dices, faces] = argument.split("d").map(x => parseInt(x)),
            results = [];

          for (var i = 0; i< dices; i++) {
            results.push(Math.floor(Math.random()*faces+1));
          }

          var reply = "rolled "+argument+"\nresult(s) :"
          results.forEach(r => {
            reply += " "+r
          });
          if (dices < 1) {reply += "\nsum : "+results.reduce((a,b)=>a+b)}

          message.reply(reply)
        }
        else {
          message.reply("Tell me the dice(s) to roll like that : !roll 2d20");
        }
        break;
      default: //---------------------
        message.reply("I don't know the command : "+command)
    }
  }
});

// NEW MEMBER --------------------------------
client.on("guildMemberAdd", (client, member) => {
  member.send(
    `Welcome on the server! Please be aware that we won't tolerate troll, spam or harassment. Have fun 😀`
  )
});

// CONNECTION ---------------------------------
client.login(process.env.BOT_TOKEN)
