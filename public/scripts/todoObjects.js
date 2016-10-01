require('dotenv').config();
const request = require('request')
const gooRoot = "https://www.googleapis.com/books/v1/volumes?q="
const mdRoot = "http://www.omdbapi.com/?y=&plot=full&type=movie&r=json&t="
const eatRoot = "https://api.yelp.com/v3/businesses/search?location=vancouver+canada&term="
const buyRoot = "http://api.walmartlabs.com/v1/search?apiKey=" + process.env.WALMART_KEY

$(function() {
   function getToken(cb) {
  request.post({
  url: "https://api.yelp.com/oauth2/token",
  form: {
    grant_type: 'client_credentials',
    client_id: process.env.YELP_USR,
    client_secret: process.env.YELP_KEY
    },
    json: true
  }, function(err, httpResponse, body) {
    if (err) { return (err); }
    yelpToken = 'Bearer ' + body.access_token;
    cb(yelpToken);
  })
};

  function getBooks(options, cb) {
    request.get({
      url: gooRoot + options + '&key=' + process.env.GOOGLE_KEY,
      json:true
    }, (err, incomingMessage, responseBody) => {
        if (err) {
         return err;
      } else if (incomingMessage.statusCode === 400) {
         return new Error("the Google API Key you are using is invalid");
      } else {
        cb(esponseBody);
      }
    })
  };

function getMovies(options, cb) {
    request.get({
      url: mdRoot + options,
      json: true
    }, (err, incomingMessage, responseBody) => {
      if (err) {
        return err;
      } else {
      cb(responseBody);
      }
    })
  };

  function getEat(options, cb) {
    request.get({
      url: eatRoot + options,
      headers:{"authorization": token},
      json: true
    },
      function (err, incomingMessage, responseBody) {
      if(err) {
        return err;
      } else {
        cb(responseBody);
      }
    })
  };

  function getBuy(options, cb) {
    request.get(buyRoot + "query=" + options,
      function (err, incomingMessage, responseBody) {
      if(err) {
        return err;
      } else if (incomingMessage.statusCode === 403) {
        return new Error("the Walmart API Key you are using is invalid");
      } else {
       cb(responseBody);
      }
    })
  };

  $('.submit').submit(function(e){
    options = $(this).closest('textarea').val().split(" ").join("+");
    console.log(options);
    if($(this).closest('#options').val() == "watch"){
      api.getMovies(options, function(movieInfo){
      title = movieInfo.Title;
      genre = movieInfo.Genre;
      runTime = movieInfo.runTime;
      imdbRating = movieInfo.imdbRating;
      actors = movieInfo.Actors;
      plot = movieInfo.Plot;
      console.log(title, genre, runTime, imdbRating, plot, actors);
      })
    }
  })
});

















//     if($(this).closest(#options).val() == "eat") {
//       getToken(function(token){
//         getEat(options, token, function(eatery){
//           let restOne = eatery.businesses[0]
//           add = restOne.address

//           ;
//         })
//      })
//     }
//   }
// });


// $(this).closest(#options).val()


// if( === eat) {
//   function run() {
//     getToken(function(token){
//       getEat(options, token, function(eatery){
//         return eatery
//       })
//     })
//   }
// }