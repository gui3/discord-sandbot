
const Debugger = function (message, silent=false) {
  this.message = message;
  this.outputs = [
    console.log,
    this.message.reply
  ];
  this.silent = silent;
  this.say = function (text) {
    if (!this.silent) {
      console.log(text);
      this.message.reply(text)
    }
  };
  this.error = function (text) {
    if (this.silent) {
      console.error("*Erreur- lancer le mode debug*")
      this.message.reply("*Erreur - lancer le mode debug*")
    }
    else {
      this.say(text)
    }
  }

  return this;
}


module.exports = Debugger
