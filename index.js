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

client.on("message", async message => {

  if (message.content.startsWith(message.guild.guildVars.prefix)) {
    //you talking to the bot
    var arguments = message.content
      .slice(message.guild.guildVars.prefix.length).split(/[ \r\n]+/);
    var command = arguments.shift();

    var reply = "command " + message.content + " :\n"

    if (client.botVars.commands[command]) {
      let c = client.botVars.commands[command]
      try {
        if (c.async) {
          reply += await c.function(arguments, message);
        }
        else {
          reply += c.function(arguments,message);
        }
      } catch (err) {
        message.reply("erreur : "+err.message)
      }
    }
    else {
      reply += "commande inconnue ..."
    }

    message.delete().catch(err=>{
      message.reply("*j'ai pas la permission de supprimer des messages*")
    });
    if (reply) {
      message.reply(reply);
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
