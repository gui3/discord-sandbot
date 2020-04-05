const Youtube = require('simple-youtube-api');
const ytdl = require('ytdl-core');

const youtube = new Youtube(process.env.GOOGLE_API_KEY);

module.exports = {
  name: "play",
  help: "Cherche la musique indiquée sur youtube\n"+
    "et la lance dans le chat vocal ou vous êtes",
  async: true,
  function: async function (arguments, message, debug) {
    //check if voice channel
    message.reply("... je cherche la musique")
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

    function playSong (song, voiceChannel, message) {
      debug.say("... je tente de jouer la musique")
      voiceChannel
        .join() // join the user's voice channel
        .then(connection => {
          const streamOptions = { seek: 0, volume: 0.3 };
          const dispatcher = connection
            .playStream(
              ytdl(song.url, { // pass the url to .ytdl()
                quality: 'highestaudio',
                filter: 'audioonly',
                // download part of the song before playing it
                // helps reduces stuttering
                highWaterMark: 1024 * 1024 * 10
              }),
              streamOptions
            )
            .on('start', () => {
              debug.say("...start")
              // the following line is essential to other commands like skip
              voiceChannel.songDispatcher = dispatcher;
              //return queue.shift(); //  dequeue the song
              message.reply("On joue : "+song.title);
              return ""
            })
            .on('finish', () => { // this event fires when the song has ended
              debug.say("...finish")
              voiceChannel.currentlyPlaying = false;
              voiceChannel.leave(); // leave the voice channel
              message.reply("Song is over!")
              return ""
            })
            .on('error', err => {
              debug.error('ERREUR : ' + err.message);
              console.error(err);
              voiceChannel.leave();
              //return "error"
              return ""
            });
        })
        .catch(err => {
          debug.error("ERREUR : " + err.message)
          console.error(err);
          voiceChannel.leave();
          //return "error"
          return ""
        });
    }

    // if YOUTUBE URL ------------------------
    if (query.match(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/)) {
      const url = query; // temp variable
      try {
        message.reply("...je cherche la video")
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
        debug.say("j'ai trouvé la video : "+song.title)
        voiceChannel.currentlyPlaying = song;
        return playSong(song, voiceChannel, message);

      } catch (err) {
        console.error(err);
        debug.error("erreur : " + err.message)
        return 'Something went wrong, please try again later';
      }
    }

    // IF No URL -----------

    else {
      try {
        message.reply("...je cherche la video")
        const videos = await youtube.searchVideos(query, 1);
        if (videos.length < 1) {
          return "I had some trouble finding what you were looking for,"+
          " please try again or be more specific";
        }
        debug.say("...j'ai trouvé une video : " + videos[0])
        try {
          // get video data from the API
          var video = await youtube.getVideoByID(videos[0].id);
        } catch (err) {
          debug.error("ERREUR : " + err.message)
          console.error(err);
          return
            'An error has occured when trying to get the video ID from youtube'
          ;
        }
        const url = `https://www.youtube.com/watch?v=${video.raw.id}`;
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
        message.reply("...j'ai bien récupéré la video : " + song.title)

        //console.log(song)

        voiceChannel.currentlyPlaying = song;
        return playSong(song, voiceChannel, message);

      } catch (err) {
        debug.error("ERREUR : " + err.message)
        console.error(err);
        return "";
      }
    }

  }
};
