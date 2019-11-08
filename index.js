const Discord = require('discord.js');
const fs = require("fs");
require('dotenv').config();

const client = new Discord.Client();
client.botVars = {}

// READY -------------------------------------
function botReboot(guild) {
  function getFirstChan () {
    return guild.channels.array().sort((a,b)=>a.createdAt-b.createdAt))
  };
  guild.guildVars = {
    prefix: "!",
    mainChan: getFirstChan(),
    getFirstChan: getFirstChan,
  };
  guild.channels.forEach(chan => {
    chan.send("Bonjour ! on vient de me rebooter !");
  });
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

client.on("message", message => {
  interpreter(message, client);
});

// NEW MEMBER --------------------------------
client.on("guildMemberAdd", (client, member) => {
  member.send(
    `Welcome on the server! Please be aware that we won't tolerate troll, spam or harassment. Have fun 😀`
  )
});

// CONNECTION ---------------------------------
client.login(process.env.BOT_TOKEN)
