const Discord = require('discord.js');
const fs = require("fs");
require('dotenv').config();

const client = new Discord.Client();
client.botVars = {}

const prefix = "!"

// READY -------------------------------------
function botReboot(guild) {
  function getFirstChan () {
    return guild.channels.array().sort((a,b)=>a.createdAt-b.createdAt);
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



// NEW MESSAGE IN TEXT CHAT --------------------
client.on("message", message => {

//  if (message.content.startsWith(message.guild.guildVars.prefix)) {
    // ligne ci-dessus ne fonctionne pas avec '<client>.send()' (code original de Guillaume)
    // correction proposee ci-dessous: 'prefix' est defini par une 'const'
  if (message.content.startsWith(prefix)) {
    // le message commence par 'prefix' -> instruction pour le bot

// ----- definition variable 'arguments' ---------------------
    var msg = message.content.toLowerCase()
    // esperer que .toLowerCase() n'affecte pas les mentions
    var arguments = msg.slice(prefix.length).split(/[ \r\n]+/)
    // le code ne distinguera pas les majuscules apres '!'
// ----- definition variable 'command' -----------------------
    var command = arguments.shift()
    // .shift() permet de retirer le 1er elmt d'un tableau et de renvoyer cet élmt
// -----------------------------------------------------------

    const debug = new Debugger(message);
    debug.silent = !arguments.includes("debug")

    if (arguments.includes("debug")) {
      arguments.pop(arguments.indexOf("debug"))
      // .pop() supprime le dernier elmt d'un tableau et retourne cet elmt
      // .indexOf() method returns the position of the 1st occurrence of a specified value in a string
    }

// ----- envoi d'un message privé à celui qui lance la commande ----------
//        message.delete()  // supprime message (pas d'autorisation)
//        message.author.send("Message privé en DM")  // message prive
// ----- message prive aux personnes mentionnees -------------------------
    let mention = message.mentions.users
    if (mention.first() != null) {  // >1 mention dans le message
      message.reply("Résultat de *" + msg + "* sera envoyé en DM")
    } else {  // pas de mention dans le message
      message.reply("commande *" + msg + "*" +
        (debug.silent ? "\n" : " ---DEBUG MODE activé"))
    }

    let result  // resultat de fonction (sous forme texte)

    if (client.botVars.commands[command]) {
      let c = client.botVars.commands[command]
      try {
        if (c.async) {
          c.function(arguments, message, debug)
          .then(result => message.reply(
            "Retour de *" + msg +
            "* --------------------\n" + result
          ))
          .catch(err => debug.say("ERREUR : " + err.message));
        }
        else {
          result = c.function(arguments, message, debug);
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
    });
// ------------------------------------------------------------------
    if (result) {
      if (mention.first() != null) {  // retour par message prive
        let envoi = false
        mention.forEach((destinataire) => {
          arguments.pop(arguments.indexOf(destinataire))
          if (!destinataire.bot && String(destinataire.presence.status) == 'online') {
            destinataire.send("Résultat de *" + msg +"* par " + message.author.username)
            destinataire.send(result)
            envoi = true
          } else if (destinataire.bot) {
            message.reply(destinataire.username + " est un bot")
          } else if (String(destinataire.presence.status) != 'online') {
            message.reply(destinataire.username + " est absent")
          }
        })
        if (!envoi) { message.reply("Aucun destinataire valide") }
      }
      else {  // retour fonction sous forme de reponse au commanditaire dans le chat commun
        message.reply(result)
      }
    }
// ------------------------------------------------------------------
  }
  else if (message.content.match(/OUI OU MERDE/i)) { // outil décisionnel
    message.reply(["OUI","OUI","OUI",
      "MERDE","MERDE","MERDE",
      "ZBRADARALDJAN"]
      [Math.floor(Math.random() * 7)]);
  };
});
// END ------------------------------


// NEW MEMBER --------------------------------
client.on("guildMemberAdd", (client, member) => {
  member.send(
    `Welcome on the server! Please be aware that we won't tolerate troll, spam or harassment. Have fun 😀`
  )
});

// CONNECTION ---------------------------------
client.login(process.env.BOT_TOKEN)
