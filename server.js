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

app.post('/search/result', (req, res) => {
  console.log(req.body.type);
  console.log(req.body.userinput);
   taskType = req.body.type;
  let userTask = req.body.userinput.split(" ").join("+");
///IF?
  if(taskType === "watch") {
    api.getTitles(userTask, (titles) => {
      var taskPromises = [];
      titles.forEach(function(title) {
        let p = new Promise((resolve, reject) => {
          api.getMovie(title, (movieInfo) => {
            let taskObject = {};
            taskObject.name = movieInfo.Title;
            taskObject.genre = movieInfo.Genre;
            taskObject.runTime = movieInfo.runTime;
            taskObject.rating = movieInfo.imdbRating;
            taskObject.persons = movieInfo.Actors;
            taskObject.desc = movieInfo.Plot;
            resolve(taskObject);
          });
        });
        taskPromises.push(p);
        console.log(taskPromises);
      });
      Promise.all(taskPromises).then((taskObjects) => {
      app.render('/search_result', {table: taskObjects})
      });

    });
  };
  ///IF?
  if(taskType === "read") {
    api.getBooks(req.body.userinput, (bookInfo) => {
      var taskObjects = [];
      for (let i = 0; i < 10; i++) {
        let taskObject = {};
        book = bookInfo.items[i]
        taskObject.name = book.volumeInfo.title
        taskObject.persons = book.volumeInfo.authors
        taskObject.desc = book.volumeInfo.description
        taskObject.date = book.volumeInfo.publishedDate
        taskObject.rating = book.averageRating
        //taskObject.img = book.imageLinks.thumbnail
        taskObjects.push(taskObject);
     };
     console.log(taskObjects);
     app.render('/main_search', {taskObjects: taskObjects})
    })
  };
  ///IF?
  if(taskType === "eat") {
    api.getToken(function(yelpToken) {
      api.getEat(userTask, yelpToken, (eatInfo) => {
        debugger;
        var taskObjects = [];
         for (let i = 0; i < 10; i++) {
          taskObject = {};
          eat = eatInfo.businesses[i];
          taskObject.name = eat.name;
          taskObject.rating = eat.rating;
          taskObject.desc = eat.location.address1 + ", " + eat.location.city;
          taskObject.price = eat.price;
          taskObject.img = eat.img_url;
          taskObjects.push(taskObject);
          console.log(taskObject);
        };
      app.render('/main_search', taskObject)
      });
    });
  }
  ///IF??
  if(taskType === "buy") {
    api.getBuy(userTask, function(buyInfo) {
      var taskObjects = [];
      for (let i = 0; i < 10; i++) {
        taskObject = {};
        buy = buyInfo.items[i];
        taskObject.name = buy.name;
        if(buy.salePrice) {taskObject.price = buy.salePrice}
        else(taskObject.price = buy.mrsp)
        if(buy.shortDescription){taskObject.desc = buy.shortDescription}
        else(taskObject.desc = buy.longDescription)
        taskObject.img = buy.thumbnailImage;
        taskObject.rating = buy.customerRating;
        taskObjects.push(taskObject);
      };
    console.log(taskObjects);
    //app.render('/search_result', taskObject)
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
