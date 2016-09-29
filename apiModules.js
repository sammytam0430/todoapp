require('dotenv').config();
const request = require('request')
const gooRoot = "https://www.googleapis.com/books/v1/volumes?q="
const mdRoot = "http://www.omdbapi.com/?y=&plot=full&type=movie&r=json&t="
const eatRoot = "https://api.yelp.com/v3/businesses/search?location=vancouver+canada&term="
const buyRoot = "http://api.walmartlabs.com/v1/search?apiKey=" + process.env.WALMART_KEY

//POST request to Get OAUTH token from YELP
var getToken = function(){
  request.post({
  url: "https://api.yelp.com/oauth2/token",
  form: {
    grant_type: 'client_credentials',
    client_id: process.env.YELP_USR,
    client_secret: process.env.YELP_KEY
    },
    json: true
  }, function(err, httpResponse, body) {
    yelpToken = 'Bearer ' + body.access_token;
    return yelpToken;
  });
};

// getToken();
// test('starbucks');

module.exports = {

  getBooks: function(options, cb) {
    request.get({
      url: gooRoot + options + '&key=' + process.env.GOOGLE_KEY,
      json:true
    }, (err, incomingMessage, responseBody) => {
        if (err) {
         return err;
      } else if (incomingMessage.statusCode === 400) {
         return new Error("the Google API Key you are using is invalid"));
      } else {
        return responseBody;
      }
    })
  };

  getMovies: function(options, cb) {
    request.get({
      url: mdRoot + options,
      json: true
    }, (err, incomingMessage, responseBody) => {
      if (err) {
        return err;
      } else {
      return responseBody;
      }
    })
  };

  getEat: function(options, cb) {
    request.get({
      url: eatRoot + options,
      headers:{"authorization": yelpToken},
      json: true
    },
      function (err, incomingMessage, responseBody) {
      if(err) {
        return err;
      } else {
        return responseBody;
      }
    })
  };

  getBuy: function(options, cb) {
    request.get(url: buyRoot + "query=" + options,
      function (err, incomingMessage, responseBody) {
      if(err) {
        return err;
      } else if (incomingMessage.statusCode === 403) {
        return new Error("the Walmart API Key you are using is invalid");
      } else {
       return responseBody
      }
    })
  }
}



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

// //Below are all structure ideas on how to implement the above getDo function using closures so we dont have to get the token every time we call the function
// //from NPM request docs --> we could use this to do an authorizedRequest.get instead of just a request.get

// function authenticate() {}
// function initApi (cb) {
//   let authenticatedRequest = authenticate(
//     );

//   return {
//     getDo: function(options, cb) {
//       authenticatedRequest.get(...)
//     }
//   }
// }

// let api = initApi((err, api) => {
//   api.getDo(...);
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


// var test = function(options, cb) {
//     request.get({
//       url: doRoot + options,
//       headers:{"authorization": "Bearer o7xlBlQDVwvkdIqjZFlAJFAICXXKwm0g8yNBJMW4-sXZx0VMcwdnL4TLE9n6JwmROnEZ2KsAen4K_Oh749j3EhxRumkhws_faXlVVeUdsMFy4yLEdq9gmuTO41_sV3Yx"},
//       json: true
//     },
//       function (err, incomingMessage, responseBody) {
//       if(err) {
//         console.log(err);
//         callback(err);
//      // } else if (responseBody.code = '500 Internal Server Error') { New KEY needed
//       } else {
//         console.log('***********', responseBody.businesses[1]);
//       }
//     })
//   }
