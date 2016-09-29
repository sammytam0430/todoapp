const request = require('request')
const gooRoot = "https://www.googleapis.com/books/v1/volumes?q="
const mdRoot = "http://www.omdbapi.com/?y=&plot=full&type=movie&r=json&t="
const doRoot = "https://api.yelp.com/v3/businesses/search?location=vancouver&term="
require('dotenv').config();

module.exports = {

  getBooks: function(options, cb) {
    request.get(url: gooRoot + options + '&key=' + process.env.GOOGLE_KEY, function (err, incomingMessage, responseBody) {
        if (err) {
         callback(err);
      } else if (incomingMessage.statusCode == 404) {
         callback(new Error("the user/repo combo does not exist"));
      } else if (incomingMessage.statusCode == 401) {
        callback(new Error("the authentication information in .env was incorrect"));
      } else {
         callback(null, responseBody);
      }
    })
  },

  getMovies: function(options, cb) {
    request.get({
      url: mdRoot + options
    })
  },

  getDo: function(options, cb) {
    authRequest.get({
    })
  }

};


var getCredentials = request.post(
        "https://api.yelp.com/oauth2/token")
        .form({grant_type: 'client_credentials',
              client_id: process.env.YELP_USR,
            client_secret: process.env.YELP_KEY})

//This gets us our authorization token
request.post({
  url: "https://api.yelp.com/oauth2/token",
  form: {
    grant_type: 'client_credentials',
    client_id: process.env.YELP_USR,
    client_secret: process.env.YELP_KEY
  }
}, function(err, httpResponse, body) {
  cb()
});

//Below are all structure ideas on how to implement the above getDo function using closures so we dont have to get the token every time we call the function
//from NPM request docs --> we could use this to do an authorizedRequest.get instead of just a request.get
var authorizedRequest = request.defaults({
  headers: {'x-token': 'my-token'}
})

function authenticate() {}
function initApi (cb) {
  let authenticatedRequest = authenticate(
    );

  return {
    getDo: function(options, cb) {
      authenticatedRequest.get(...)
    }
  }
}

let api = initApi((err, api) => {
  api.getDo(...);
});
