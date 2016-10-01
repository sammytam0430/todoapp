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

var api = require('./apiModules.js')

const express     = require("express");
const app         = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
const bodyParser  = require("body-parser");
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
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
   taskType = req.body.type;
  var userTask = req.body.userinput.split(" ").join("+");
///IF?
  if(taskType === "watch") {
    api.getTitles(userTask, (titleInfo) => {
      var taskObjects = [];
      titleInfo.forEach(function(title) {
        api.getMovie(title, (movieInfo) => {
        debugger;
         let taskObject = {};
         taskObject.name = movieInfo.Title;
         taskObject.genre = movieInfo.Genre;
         taskObject.runTime = movieInfo.runTime;
         taskObject.rating = movieInfo.imdbRating;
         taskObject.persons = movieInfo.Actors;
         taskObject.desc = movieInfo.Plot;
         taskObjects.push(taskObject);
        //app.render('/main_search', {table: taskObjects})
        });
      });
    });
   };
  ///IF?
  if(taskType === "read") {
    api.getBooks(userTask, (bookInfo) => {
      var taskObjects = []
      for (let i = 0; i < 10; i++) {
       let taskObject = {}
       book = bookInfo.items[i]
       taskObject.name = book.volumeInfo.title
       taskObject.persons = book.volumeInfo.authors
       taskObject.desc = book.volumeInfo.description
       taskObject.date = book.volumeInfo.publishedDate
       taskObject.rating = book.averageRating
       taskObject.img = book.imageLinks.thumbnail
       taskObjects.push(taskObject);
     };
    console.log(taskObjects);
      // app.render('/main_search', taskObject)
     })
  };
  ///IF?
  if(taskType === "eat") {
    api.getToken(function(yelpToken) {
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
