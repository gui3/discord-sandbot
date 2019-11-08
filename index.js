const Discord = require('discord.js')
require('dotenv').config()

const client = new Discord.Client()


client.playing = 0

// READY -------------------------------------
client.on("ready", client => {
  console.log(`Logged in !`)
});


// MESSAGES & COMMANDS -----------------------
const interpreter = require("./commands/_interpreter")
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
