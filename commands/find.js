const Youtube = require('simple-youtube-api');

const youtube = new Youtube(process.env.GOOGLE_API_KEY);

module.exports = {
  name: "find",
  help: "Cherche les mots indiqués sur Youtube\n"+
    "et affiche la video",
  async: true,
  ignorehelp: 0,
  function: async function (arguments, message) {

    var query = arguments.join(" ");

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
      debug.error(err);
      return 'Something went wrong, please try again later';
    }
  }
};
