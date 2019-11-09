const Youtube = require('simple-youtube-api');
const ytdl = require('ytdl-core');

const youtube = new Youtube(process.env.API_YOUTUBE);

module.exports = {
  name: "play",
  help: "Cherche la musique indiquee sur youtube\n"+
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

    function playSong (song, voiceChannel, message) {
      voiceChannel
        .join() // join the user's voice channel
        .then(connection => {
          const streamOptions = { seek: 0, volume: 0.2 };
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
              // the following line is essential to other commands like skip
              voiceChannel.songDispatcher = dispatcher;
              //return queue.shift(); //  dequeue the song
              message.reply("On joue : "+song.title);
            })
            .on('finish', () => { // this event fires when the song has ended
              voiceChannel.currentlyPlaying = false;
              voiceChannel.leave(); // leave the voice channel
              message.reply("Song is over!")
              return
            })
            .on('error', e => {
              message.reply('Cannot play song');
              console.error(e);
              voiceChannel.leave();
              return "error"
            });
        })
        .catch(e => {
          console.error(e);
          voiceChannel.leave();
          message.reply("Internal error, check logs")
          return "error"
        });
    }

    // if YOUTUBE URL ------------------------
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
        voiceChannel.currentlyPlaying = song;
        return playSong(song, voiceChannel, message);

      } catch (err) {
        console.error(err);
        return 'Something went wrong, please try again later';
      }
    }

    // IF No URL -----------

    else {
      try {
        const videos = await youtube.searchVideos(query, 1);
        if (videos.length < 1) {
          return "I had some trouble finding what you were looking for,"+
          " please try again or be more specific";
        }
        try {
          // get video data from the API
          var video = await youtube.getVideoByID(videos[0].id);
        } catch (err) {
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

        //console.log(song)

        voiceChannel.currentlyPlaying = song;
        return playSong(song, voiceChannel, message);

      } catch (err) {
        console.error(err);
        return 'Something went wrong, please try again later';
      }
    }

  }
};
