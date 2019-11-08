module.exports = {
  name: "SET",
  help: "**ATTENTION DANGER** change une variable de serveur\n"+
    "par exemple *!SET prefix $* changera le préfixe des commandes\n"+
    "a utiliser si on sait ce qu'on fait ...",
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
