const Discord = require('discord.js');
const fs = require("fs");
require('dotenv').config();

const client = new Discord.Client();

// READY -------------------------------------
client.on("ready", client => {
  console.log(`Logged in !`);
  client.guilds.forEach(guild => {
    console.log('Connected to guild : ' + guild.name);
  });
});

//joined a server
client.on("guildCreate", guild => {
    console.log("Joined a new guild: " + guild.name);
    //Your other stuff like adding to guildArray
})


// MESSAGES & COMMANDS -----------------------
var commands = {};
fs.readdir("./commands", (err, files) => {
  files.forEach( file => {
    try {
      var command = require("./command/"+file.replace(/.js$/,""));
      if (!(command.name && typeof command.function == "function" )) {
        throw new Error("could not load command file " + file)
      }
      commands[command.name] = command;
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
