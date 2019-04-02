require("dotenv").config();
var Keys = require("./keys.js");
var axios = require("axios");


var action = process.argv[2].toLowerCase();
var value = process.argv.slice([3]).join(" ") 

switch (action) {
  case "movie-this":
    omdb();
    break;
  case "concert-this":
    concert();
    break;
  case "spotify-this-song":
    music();
    break;
}

function omdb() {
  axios.get("http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy").then(
    function (response) {
      console.log("Title: " + value)
      console.log("IMDB Rating: " + response.data.imdbRating);
      console.log("Year: " + response.data.Year);
      console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
      console.log("Country where movie was produced: " + response.data.Country);
      console.log("Language of the movie: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
    }
  );

}

function concert() {
  axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp").then(
  function (response) {
      
      var moment = require('moment');

      for (var i = 0; i < 6; i++) {
        var date = response.data[i].datetime
        console.log("______________________________")
        console.log(response.data[i].venue.name)
        console.log(response.data[i].venue.country)
        console.log(moment(date).format('LLLL'))
        console.log("______________________________")
      }
    }
  );
}


function music() {
  var Spotify = require('node-spotify-api');


  var spotify = new Spotify({
    id: "1d34d815f5de4de49c5afd1689c18502",
    secret: "1c6cbfcb82fe4142a7b645903b2ed021"
  });

  spotify.search({ type: 'track', query: value }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log(data);
  });
}
