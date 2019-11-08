const Youtube = require('simple-youtube-api');
const ytdl = require('ytdl-core');

const youtube = new Youtube(process.env.API_YOUTUBE);

module.exports = {
  name: "play",
  help: "(pas au point) Cherche la musique indiquee sur youtube\n"+
    "et la lance dans le chan vocal ou vous êtes",
  async: true,
  function: async function (arguments, message) {
    //check if voice channel
    var voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return 'Il faut être connecté à un salon vocal !';

    var query = arguments.join(" ");

    function formatDuration (durationObj) {
      const duration = `${durationObj.hours ? durationObj.hours + ':' : ''}${
        durationObj.minutes ? durationObj.minutes : '00'
      }:${
        durationObj.seconds < 10
          ? '0' + durationObj.seconds
          : durationObj.seconds
          ? durationObj.seconds
          : '00'
      }`;
      return duration;
    };

    function playSong (song, message) {
      var voiceChannel = song.voiceChannel;
      song.voiceChannel
        .join() // join the user's voice channel
        .then(connection => {
          const dispatcher = connection
            .play(
              ytdl(song.url, { // pass the url to .ytdl()
                quality: 'highestaudio',
                // download part of the song before playing it
                // helps reduces stuttering
                highWaterMark: 1024 * 1024 * 10
              })
            )
            .on('start', () => {
              // the following line is essential to other commands like skip
              //voiceChannel.songDispatcher = dispatcher;
              //return queue.shift(); //  dequeue the song
            })
            .on('finish', () => { // this event fires when the song has ended
              voiceChannel.currentlyPlaying = false;
              return voiceChannel.leave(); // leave the voice channel
            })
            .on('error', e => {
              message.say('Cannot play song');
              console.error(e);
              return voiceChannel.leave();
            });
        })
        .catch(e => {
          console.error(e);
          return voiceChannel.leave();
        });
    }

    // if YOUTUBE URL
    if (query.match(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/)) {
      const url = query; // temp variable
      try {
        query = query
          .replace(/(>|<)/gi, '')
          .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        const id = query[2].split(/[^0-9a-z_\-]/i)[0];
        const video = await youtube.getVideoByID(id);
        const title = video.title;
        let duration = formatDuration(video.duration);
        const thumbnail = video.thumbnails.high.url;
        if (duration == '00:00') duration = 'Live Stream';
        const song = {
          url,
          title,
          duration,
          thumbnail,
          voiceChannel
        };
        //voiceChannel.currentlyPlaying = song;
        voiceChannel.currentlyPlaying = song;
        playSong(voiceChannel.currentlyPlaying, message);

      } catch (err) {
        console.error(err);
        return 'Something went wrong, please try again later';
      }
    }


  }
};
