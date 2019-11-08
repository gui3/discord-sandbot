module.exports = {
  name: "ping",
  help: "vérifie si le bot fonctionne, si oui, il réponds **Pong!**",
  function: function (arguments, message) {
    var reply = "";
    if (arguments.length != 2) {
      reply = "mauvaise utilisation de SET, c'est réservé aux doués..."
    }
    else {
      message.guild.guildVars[arguments[0]] = arguments[1]
      reply = arguments[0]+" successfully set to "+arguments[1];
      if (arguments[0] == "prefix") {
        message.guild.channels.array().forEach(c=>{
          if (c.type == "text") {
            c.send("**ATTENTION** le préfixe des commandes a changé !\n"+
              "le nouveau préfixe est "+arguments[1]+"\n"+
              "pour en savoir plus, tapez *"+arguments[1]+"help*");
          }
        });
      }
    }
    return reply;
  }
};
