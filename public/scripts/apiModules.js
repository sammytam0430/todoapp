require('dotenv').config();
const request = require('request')
const gooRoot = "https://www.googleapis.com/books/v1/volumes?q=intitle:"
const mdRoot = "http://www.omdbapi.com/?y=&plot=full&type=movie&r=json&"
const eatRoot = "https://api.yelp.com/v3/businesses/search?location=vancouver+canada&term="
const buyRoot = "http://api.walmartlabs.com/v1/search?apiKey=" + process.env.WALMART_KEY + "&"

module.exports = {
//POST request to Get OAUTH token from YELP
  getToken: (cb) => {
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
  },

  getBooks: (options, cb) => {
    request.get({
      url: gooRoot + options + '&key=' + process.env.GOOGLE_KEY,
      json:true
    }, (err, incomingMessage, responseBody) => {
        if (err) {
          return err;
      } else if (incomingMessage.statusCode === 400) {
          return new Error("the Google API Key you are using is invalid");
      } else {
        cb(responseBody);
      }
    })
  },

  getMovie: (options, cb) => {
    request.get({
      url: mdRoot + "&t=" + options,
      json: true
    }, (err, incomingMessage, responseBody) => {
      if (err) {
        return err;
      } else {
      cb(responseBody);
      }
    })
  },

  getTitles: (options, cb) => {
    request.get({
    url: mdRoot + "pages=10&s=" + options,
    json: true
    }, (err, incomingMessage, responseBody) => {
      if (err) {return err;}
      if (responseBody.Response == 'False') {
        let titles = "no results";
        return cb(titles);
      } else {
        titles = []
        responseBody.Search.forEach((item) => {
        title = item.Title.split(" ").join("+");
        titles.push(title);
      })
    }
    cb(titles);
   })
  },

  getEat: (options, yelpToken, cb) => {
    request.get({
      url: eatRoot + options,
      headers:{"authorization": yelpToken},
      json: true
    },
      function (err, incomingMessage, responseBody) {
      if(err) {
        return err;
      } else {
        cb(responseBody);
      }
    })
  },

  getBuy: (options, cb) => {
    console.log(buyRoot + "query=" + options)
    request.get({url: buyRoot + "query=" + options,
      json:true},
      function (err, incomingMessage, responseBody) {
      if(err) {
        return err;
      } else if (incomingMessage.statusCode == 403) {
        console.log("we dont have a code");
        return new Error("the Walmart API Key you are using is invalid");
      } else {
       cb(responseBody);
      }
    })
  }
};
