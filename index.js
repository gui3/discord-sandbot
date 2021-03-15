const Discord = require('discord.js');
const fs = require("fs");
require('dotenv').config();

const client = new Discord.Client();
client.botVars = {}

const prefix = "!"

// ------------------------------------------
const TURN_OFF = false 
// true pour empecher le bot de se connecter a discord
// et te permettre de tester en local

// express server -------------------------------
// pour afficher l'état du bot sur 
// https://palamede-bot.glitch.me
const express = require("express")
const app = express()

// variable pour voir l'état du bot
let CONNECTED = false


app.get("/", (req, res) => {
  res.send(`
<style>
* {
  background: #112;
  color: #f7a;
  font-family: monospace;
}
</style>
<h1>le bot est <em>${CONNECTED ? "CONNECTE" : "HORS-LIGNE"}</em></h1>
<p>Rafraichissez la page pour connaitre l'état du bot discord.</p>
  `)
})

const PORT = process.env.PORT || 5000
app.listen(PORT, _ => {
  console.log("server listenning on port " + PORT)
})

// READY -------------------------------------

function botReboot(guild) {
  function getFirstChan () {
    return guild.channels.cache.array().sort((a,b)=>a.createdAt-b.createdAt);
  };
  guild.guildVars = {
    prefix: prefix,
    mainChan: getFirstChan(),
    getFirstChan: getFirstChan
  };
  // guild.channels.array().forEach(chan => {
  //   if (chan.type === "text") {
  //     chan.send("Bonjour ! on vient de me rebooter !");
  //   }
  // });
}

client.on("ready", c => {
  console.log(`Logged in !`);
  client.guilds.cache.each(guild => {
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



// NEW MESSAGE IN TEXT CHAT --------------------
client.on("message", message => {

//  if (message.content.startsWith(message.guild.guildVars.prefix)) {
    // ligne ci-dessus ne fonctionne pas avec '<client>.send()' (code original de Guillaume)
    // correction proposee ci-dessous: 'prefix' est defini par une 'const'
  if (message.content.startsWith(prefix)) {
    // le message commence par 'prefix' -> instruction pour le bot

// ---------- definition variable 'arguments' ----------------------------------
    var arguments = message.content.toLowerCase().slice(prefix.length).split(/[ \r\n]+/)
    // le code ne distinguera pas les majuscules apres '!'
    // .toLowerCase() n'affecte pas les mentions

// ---------- definition variable 'command' ------------------------------------
    var command = arguments.shift()
    // .shift() permet de retirer le 1er elmt d'un tableau et de renvoyer cet élmt
    // comand crrespond à la fonction que l'utilisateur veut appeler

    const debug = new Debugger(message);
    debug.silent = !arguments.includes("debug")

    if (arguments.includes("debug")) {
      arguments.pop(arguments.indexOf("debug"))
      // .pop() supprime le dernier elmt d'un tableau et retourne cet elmton of the 1st occurrence of a specified valu
      // .indexOf() method returns the positie in a string
    }

// ---------- retirer les mentions dans la var arguments -----------------------
    let mentions = message.mentions.users
    mentions.forEach((destinataire) => {
      // déplacé ici pour que arguments soit nettoyé avant processing
      arguments.pop(arguments.indexOf(destinataire))
    })

    let msg = [prefix+command, ...arguments].join(' ')
    let sendReply // La future fonction pour repondre
    if (mentions.first() != null) {  // >1 mention dans le message
// ---------- ENVOI DE LA REPONSE EN PRIVE AUX MENTIONS ------------------------
      sendReply = function (message, text) {
        let envoi = false
        let receveurs = []
        message.mentions.users.forEach((destinataire) => {
          if (!destinataire.bot && String(destinataire.presence.status) == 'online') {
            // la mention designe un utilisateur connecté et qui n'est pas un bot
            if (message.author.id === destinataire.id) {
              destinataire.send("Résultat de ta commande *" + msg +"*")
            } else {
              // tierce personne, nom de l'auteur de la commande est précisé
              destinataire.send("Résultat de *" + msg +"* envoyé par "+message.author.username)
            }
            destinataire.send(text)
            receveurs.push(destinataire.username)
            envoi = true
          } else if (destinataire.bot) {
            message.reply(destinataire.username + " est un bot")
          } else if (String(destinataire.presence.status) != 'online') {
            message.reply(destinataire.username + " n'est pas en ligne")
          }
        })
        if (!envoi) {
          message.reply("Aucun destinataire valide")
        }
        else {
          message.reply("Résultat envoyé en privé à " + receveurs.join(", "))
        }
      }
    } else {  // pas de mention dans le message
// ---------- EXECUTION NORMALE AVEC AFFICHAGE CHAT TEXTUEL --------------------
      message.reply("commande *" + msg + "*" +
        (debug.silent ? "\n" : " ---DEBUG MODE activé"))
      // sendReply par défaut
      sendReply = function (message, text) {
        message.reply(text)
      }
    }

    let result  // resultat de fonction (sous forme texte)

    if (client.botVars.commands[command]) {
      let c = client.botVars.commands[command]
      try {
        if (c.async) {
          c.function(arguments, message, debug)
          .then(result => sendReply( // utilisation de la fonction de reponse
            message,
            result
          ))
          .catch(err => debug.say("ERREUR : " + err.message));
        }
        else {
          sendReply(message, c.function(arguments, message, debug)) // deuxieme utilisation
        }
      } catch (err) {
        debug.say("ERREUR : "+err.message)
      }
    }
    else {
      message.reply("commande inconnue ...")
    }
    message.delete().catch(err => {
      debug.say("*j'ai pas la permission de supprimer des messages*")
    })
// ------------------------------------------------------------------
  }
  else if (message.content.match(/OUI OU MERDE/i)) { // outil décisionnel
    message.reply(["OUI","OUI","OUI",
      "MERDE","MERDE","MERDE",
      "ZBRADARALDJAN"]
      [Math.floor(Math.random() * 7)]);
  }
})
// END ------------------------------


// NEW MEMBER --------------------------------
client.on("guildMemberAdd", (client, member) => {
  member.send(
    `Welcome on the server! Please be aware that we won't tolerate troll, spam or harassment. Have fun 😀`
  )
})

// CONNECTION ---------------------------------
client.login(
  TURN_OFF
  ? console.log("not connected!") && null // no connection to discord
  : process.env.BOT_TOKEN
).then(_ => {
  CONNECTED = true
}).catch(err => console.error(err))
