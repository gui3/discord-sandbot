const Discord = require('discord.js');
const fs = require("fs");
require('dotenv').config();

const client = new Discord.Client();
client.botVars = {}

// READY -------------------------------------
function botReboot(guild) {
  function getFirstChan () {
    return guild.channels.array().sort((a,b)=>a.createdAt-b.createdAt);
  };
  guild.guildVars = {
    prefix: "!",
    mainChan: getFirstChan(),
    getFirstChan: getFirstChan,
  };
  // guild.channels.array().forEach(chan => {
  //   if (chan.type === "text") {
  //     chan.send("Bonjour ! on vient de me rebooter !");
  //   }
  // });
}

client.on("ready", c => {
  console.log(`Logged in !`);
  client.guilds.forEach(guild => {
    console.log('Connected to guild : ' + guild.name);
    botReboot(guild);
  });
});

//joined a server
client.on("guildCreate", guild => {
    console.log("Joined a new guild: " + guild.name);
    botReboot(guild);
})


// MESSAGES & COMMANDS -----------------------
client.botVars.commands = {};
fs.readdir("./commands", (err, files) => {
  files.forEach( file => {
    try {
      let command = require("./commands/"+file.replace(/.js$/,""));
      if (!(command.name && typeof command.function == "function" )) {
        throw new Error("could not load command file " + file)
      }
      client.botVars.commands[command.name] = command;
    } catch (e) {
      console.log(e.message)
    }
  })
})

const Debugger = require("./helpers/Debugger")

client.on("message", message => {


  if (message.content.startsWith(message.guild.guildVars.prefix)) {
    //you talking to the bot
    var arguments = message.content
      .slice(message.guild.guildVars.prefix.length).split(/[ \r\n]+/);
    var command = arguments.shift();

    const debug = new Debugger(message);
    debug.silent = !arguments.includes("debug")

    if (arguments.includes("debug")) {
      arguments.pop(arguments.indexOf("debug"))
    };

    message.reply(
      "lance une commande ==========================\n"
      + message.content +
      (debug.silent ? "\n" : " --DEBUG MODE activé\n")
    )

    let result;

    if (client.botVars.commands[command]) {
      let c = client.botVars.commands[command]
      try {
        if (c.async) {
          c.function(arguments, message, debug)
          .then(result => message.reply(
            "Retour de " +
            message.content +
            "---------------------\n" +
            result
          ))
          .catch(err => debug.say("ERREUR : " + err.message));
        }
        else {
          result = c.function(arguments,message, debug);
        }
      } catch (err) {
        debug.say("ERREUR : "+err.message)
      }
    }
    else {
      message.reply("commande inconnue ...")
    }

    message.delete().catch(err=>{
      debug.say("*j'ai pas la permission de supprimer des messages*")
    });
    if (result) {
      message.reply(result);
    }
  }

  else if (message.content.match(/OUI OU MERDE/i)) { // outil décisionnel
    message.reply(["OUI","OUI","OUI",
      "MERDE","MERDE","MERDE",
      "ZBRADARALDJAN"]
      [Math.floor(Math.random() * 7)]);
  };
});


// NEW MEMBER --------------------------------
client.on("guildMemberAdd", (client, member) => {
  member.send(
    `Welcome on the server! Please be aware that we won't tolerate troll, spam or harassment. Have fun 😀`
  )
});

// CONNECTION ---------------------------------
client.login(process.env.BOT_TOKEN)
