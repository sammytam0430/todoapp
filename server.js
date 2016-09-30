require('dotenv').config();
const knex = require('knex')({
  client: 'pg',
  connection: {
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
    host     : process.env.DB_HOST,
    port     : process.env.DB_POST,
    ssl      : process.env.DB_SSL
  }
});

var api = require('./public/scripts/apiModules.js')

const express     = require("express");
const app         = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
const bodyParser  = require("body-parser");
app.use(bodyParser.urlencoded());
const PORT = process.env.PORT || 8080;
const connect        = require('connect')
const methodOverride = require('method-override')
app.use(methodOverride('_method'))


// HTML
app.get('/', (req, res) => {
  res.render('user_todo');
});

app.post('/search', (req, res) => {
  console.log(req.body.type);
  console.log(req.body.userinput);
   taskObject = {}
   taskType = req.body.type;
  let userTask = req.body.userinput.split(" ").join("+");
///IF?
  if(taskType === "watch") {
    api.getMovies(userTask, (movieInfo) => {
       taskObject.name = movieInfo.Title;
       taskObject.genre = movieInfo.Genre;
       taskObject.runTime = movieInfo.runTime;
       taskObject.rating = movieInfo.imdbRating;
       taskObject.persons = movieInfo.Actors;
       taskObject.desc = movieInfo.Plot;
      app.render('/main_search', taskObject)
      })
   };
  ///IF?
  if(taskType === "read") {
    api.getBooks(userTask, (bookInfo) => {
      bookInfo = bookInfo.items[0];
       taskObject.name = bookInfo.volumeInfo.title
       taskObject.persons = bookInfo.volumeInfo.authors
       taskObject.desc = bookInfo.volumeInfo.description
       taskObject.date = bookInfo.volumeInfo.publishedDate
       taskObject.rating = bookInfo.averageRating
       taskObject.img = bookInfo.imageLinks.thumbnail
       app.render('/main_search', taskObject)    })
  };
  ///IF?
  if(taskType === "eat") {
    api.getToken(function(yelpToken) {
      debugger;
      api.getEat(userTask, yelpToken, (eatInfo) => {
        eatInfo = eatInfo.businesses[0];
         taskObject.name = eatInfo.name;
         taskObject.rating = eatInfo.rating;
         taskObject.address = eatInfo.location.address1 + ", " + eatInfo.location.city;
         taskObject.price = eatInfo.price;
         taskObject.img = eatInfo.img_url

        console.log(taskObject);
        app.render('/main_search', taskObject)
      });
    });
  };
  ///IF??
  if(taskType === "buy") {
    api.getBuy(userTask, function(buyInfo) {
       buyInfo = buyInfo.items[0];
       taskObject.name = buyInfo.name;
       if(buyInfo.salePrice){taskObject.price = buyInfo.salePrice}
       else(taskObject.price = buyInfo.mrsp)
        if(buyInfo.shortDescription){taskObject.desc = buyInfo.shortDescription}
       else(taskObject.desc = buyInfo.longDescription)
       taskObject.img = buyInfo.thumbnailImage
      taskObject.rating = buyInfo.customerRating
      app.render('/search_result', taskObject)
  })
}
});

app.post('' , (req, res) => {


});

app.get('/search', (req, res) => {
  res.render('main_search');
});



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
