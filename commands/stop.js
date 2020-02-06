module.exports = {
  name: "stop",
  help: "Stoppe la musique du salon vocal sur lequel vous êtes.",
  async: true,
  function: async function (arguments, message, debug) {

    // delete the bot from all voicechannels
    const channels = message.guild.channels.map((chan) => {
      if (chan.type == "voice") {
        chan.leave()
        chan.currentlyPlaying = false;
        try {
          chan.songDispatcher.end();
        } catch (err) {
          debug.error(err)
        }
      }
    })

    //check if voice channel
    /*
    var voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return 'Il faut être connecté à un salon vocal !';
    if (!voiceChannel.songDispatcher) return "Il faut qu'une chanson joue dans le salon vocal ou vous êtes !"
    voiceChannel.songDispatcher.end();
    voiceChannel.currentlyPlaying = false;
    voiceChannel.leave();
    return "Musique arrêtée sur "+voiceChannel.name;
    */
  }
};
