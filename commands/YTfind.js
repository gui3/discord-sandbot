

const Youtube = require('simple-youtube-api');
const ytdl = require('ytdl-core');

const youtube = new Youtube(process.env.API_YOUTUBE);

module.exports = {
  name: "YTfind",
  help: "Cherche la musique indiquee sur youtube\n"+
    "et affiche la video",
  async: true,
  function: async function (arguments, message) {

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

      return url;
      
    } catch (err) {
      console.error(err);
      return 'Something went wrong, please try again later';
    }
  }
};
