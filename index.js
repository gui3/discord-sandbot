const Discord = require('discord.js')
require('dotenv').config()
const fs = require('fs')

const client = new Discord.Client()

const queue = new Map();

// READY -------------------------------------
client.on("ready", client => {
  console.log(`Logged in !`)
});


// MESSAGES & COMMANDS -----------------------
const dices = require("./helpers/dices")
const music = require("./helpers/music")
client.on("message", message => {

  //Commands
  if (message.content.match(/^![^ \r\n]/)) { //you talking to the bot
    var arguments = message.content.slice(1).split(/ +/);
    var command = arguments.shift();

    const serverQueue = queue.get(message.guild.id);

    switch (command) {
      case "ping": //-----------------
        message.reply('Pong!');
        break;

      case "play": //------------------
        music.execute(message, serverQueue);
        break;

      case "skip": //------------------
        music.skip(message, serverQueue);
        break;

      case "stop": //------------------
        music.stop(message, serverQueue);
        break;


      case "sos": //-----------------
        var results = [];
        var ignored = [];
        var critical = [];
        arguments.forEach((arg, ix) => {
          var stat = parseInt(arg);
          if (!(stat>0)) {
            ignored.push(arg);
          } else {
            var dice = dices("1d100").sum;
            if (dice === 1) {
              critical.push({
                type: "-1d100",
                result: - dices("1d100").sum
              });
            } else if (dice === 100) {
              critical.push({
                type: "1d100",
                result: dices("1d100").sum
              });
            } else if (dice < 6) {
              critical.push({
                type: "-1d20",
                result: - dices("1d20").sum
              });
            } else if (dice > 94) {
              critical.push({
                type: "1d20",
                result: dices("1d20").sum
              });
            }
            var result = dice + stat;
            if (ix > 0) {
              result = result /2
            }
            results.push({
              dice: dice,
              stat: stat,
              result: result
            });
          }
        });
        var reply = "resultat du fight : "+sum+"\n";
        var sum = 0;
        results.forEach(res => {
          reply += res.stat+" dé:"+res.dice + " = "+res.result+"\n";
          sum += res.result;
        });
        if (critical != []) {
          reply += "\nCritiques :"
          critical.forEach(c => {
            reply += c.type + ":" + c.result + " ";
            sum += c.result;
          });
          reply +="\n";
        }

        if (ignored != []) {
          reply += "\nignored arguments :";
          ignored.forEach(ign => {
            reply += " " + ign;
          })
        }

        message.reply(reply);

        break;

      case "roll": //-----------------
        var argument = arguments.join("");
        if (argument.match(/^(\d+d\d+)$/)) {
          var results = dices(argument);

          var reply = "rolled "+argument
          reply += "\nresult(s) : " + String(results.dices);
          if (results.dices.length > 1) {
            reply += "\nsum : "+results.sum;
          }

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
