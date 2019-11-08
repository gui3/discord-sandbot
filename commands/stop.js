module.exports = {
  name: "stop",
  help: "Stoppe la musique du salon vocal sur lequel vous êtes.",
  async: true,
  function: async function (arguments, message) {
    //check if voice channel
    var voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return 'Il faut être connecté à un salon vocal !';
    if (!voiceChannel.songDispatcher) return "Il faut qu'une chanson joue dans le salon vocal ou vous êtes !"
    voiceChannel.songDispatcher.end();
    return "Musique arrêtée sur "+voiceChannel.name;
  }
};
