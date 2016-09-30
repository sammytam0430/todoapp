require('dotenv').config();
const request = require('request')
const eatRoot = "https://api.yelp.com/v3/businesses/search?location=vancouver+canada&term="

function getToken(cb){
  request.post({
  url: "https://api.yelp.com/oauth2/token",
  form: {
    grant_type: 'client_credentials',
    client_id: process.env.YELP_USR,
    client_secret: process.env.YELP_KEY
    },
    json: true
  }, function(err, httpResponse, body) {
   let token = 'Bearer ' + body.access_token;
    cb(token);
  });
};

function eatApi (options, token, cb) {
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

// getToken(function(token) {
//     return token
// });

//   getEat('starbucks', token, function(eatery){
//        console.log(eatery);
//   //   console.log('are we getting here' );
//    });

  function run() {
    getToken(function(token){
      getEat('starbucks', token, function(eatery){
        console.log(eatery)
      })
    })
  }

  // run()

  let a_promise = new Promise( (resolve, reject) => {
    // do some async stuff
    request.post({
      url: "https://api.yelp.com/oauth2/token",
      form: {
        grant_type: 'client_credentials',
        client_id: process.env.YELP_USR,
        client_secret: process.env.YELP_KEY
        },
        json: true
      },
      function(err, httpResponse, body) {
          // on done
          if (err) { reject( err ); }
          resolve( body );
      });
  });

  let foo = function( data ) {
    console.log( data )
  }

a_promise
  .then( another_promise )
  .then( yet_another )
  .catch( console.error );











// var movieInfo = Movies(options);
//       console.log(movieInfo);
//       title = movieInfo.title;
//       genre = movieInfo.genre;
//       runTime = movieInfo.runTime;
//       imdbRating = movieInfo.imdbRating;
//       actors = movieInfo.actors;
//       plot = movieInfo.plot;
//   console.log(title, genre, runTime, imdbRating, actors, plot);


// //This gets us our authorization token
// request.post({
//   url: "https://api.yelp.com/oauth2/token",
//   form: {
//     grant_type: 'client_credentials',
//     client_id: process.env.YELP_USR,
//     client_secret: process.env.YELP_KEY
//   }
// }, function(err, httpResponse, body) {
//   cb()
// });


// //test AJAX implement after
// function (options) {
//  $.ajax({
//   url: doRoot + options,
//   method: 'GET'
//   dataType: 'json',
//   Authorization: 'Bearer o7xlBlQDVwvkdIqjZFlAJFAICXXKwm0g8yNBJMW4-sXZx0VMcwdnL4TLE9n6JwmROnEZ2KsAen4K_Oh749j3EhxRumkhws_faXlVVeUdsMFy4yLEdq9gmuTO41_sV3Yx',
//   success: function (data) {
// console.log(data)
// })
// }

function Movies(options, cb) {
    request.get({
      url: mdRoot + options,
      json: true
    }, (err, incomingMessage, responseBody) => {
      if (err) {
        return err;
      } else {
        debugger;
      cb(responseBody);
      }
    })
  };

var options = "a+clockwork+orange";
Movies(options, function(movieInfo){
      title = movieInfo.Title;
      genre = movieInfo.Genre;
      runTime = movieInfo.RunTime;
      imdbRating = movieInfo.imdbRating;
      actors = movieInfo.Actors;
      plot = movieInfo.Plot;
console.log(title, genre, runTime, imdbRating, actors, plot);
});
