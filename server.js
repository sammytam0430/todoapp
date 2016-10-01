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
app.use(bodyParser.json());
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
  var userTask = req.body.userinput.split(" ").join("+");
///IF?
  if(taskType === "watch") {
    api.getTitles(userTask, (titles) => {
      var taskPromises = [];
      titles.forEach(function(title) {
        var p = new Promise((resolve, reject) => {
          api.getMovie(title, (movieInfo) => {
            var taskObject = {};
            taskObject.name = movieInfo.Title;
            taskObject.rating = movieInfo.imdbRating;
            taskObject.desc = movieInfo.Actors + ', ' + movieInfo.Genre + '\n' + movieInfo.Plot + '\n' + movieInfo.Runtime;
            taskObject.img = movieInfo.Poster
            resolve(taskObject);
          });
        });
        taskPromises.push(p);
        console.log(taskPromises);
      });
      Promise.all(taskPromises).then((taskObjects) => {
      res.render('search_result', {taskObjects: taskObjects})
      });

    });
  };
  ///IF?
  if(taskType === "read") {
    api.getBooks(req.body.userinput, (bookInfo) => {
      var taskObjects = [];
      for (let i = 0; i < 10; i++) {
        let taskObject = {};
        debugger;
        book = bookInfo.items[i].volumeInfo;
        taskObject.name = book.title
        taskObject.desc = book.authors + '\n' + book.description + '\n' + book.publishedDate;
        taskObject.rating = book.averageRating;
        if(book.imageLinks) {
         taskObject.img = book.imageLinks.thumbnail;
        } else {
         taskObject.img = "../images/shia.jpg";
        }
        taskObjects.push(taskObject);
     };
     res.render('search_result', {taskObjects: taskObjects});
    })
  };
  ///IF?
  if(taskType === "eat") {
    api.getToken((yelpToken) => {
      debugger;
      api.getEat(userTask, yelpToken, (eatInfo) => {
       let numRest = function() {
          if (eatInfo.businesses.length < 10) {
            return eatInfo.businesses.length;
          } else { return 10; }
        };
        var taskObjects = [];
        for (let i = 0; i < numRest(); i++) {
          let taskObject = {};
          console.log(eatInfo.businesses[0])
          eat = eatInfo.businesses[i];
          taskObject.name = eat.name;
          taskObject.rating = eat.rating;
          taskObject.desc = eat.location.address1 + ", " + eat.location.city + '\nCuisine: '
          + eat.categories[0].title + '\nContact number: ' + eat.phone + '\nPrice Level: ' + eat.price
          taskObject.img = eat.image_url;
          taskObjects.push(taskObject);
        };
        console.log(taskObjects);
        res.render('search_result', {taskObjects: taskObjects});
      });
    });
  };
  ///IF??
  if(taskType === "buy") {
    api.getBuy(userTask, function(buyInfo) {
     let numItems = function(){
        if(buyInfo.items.length < 10) {
          return buyInfo.items.length;
        } else { 10 }
      };
      var taskObjects = [];
      for (let i = 0; i < numItems() ; i++) {
        taskObject = {};
        buy = buyInfo.items[i];
        taskObject.name = buy.name;
        if(buy.salePrice) {price = buy.salePrice}
        else(price = buy.mrsp)
        if(buy.shortDescription){taskObject.desc = buy.shortDescription + '/nPrice: ' + price}
        else(taskObject.desc = buy.longDescription + '/nPrice: ' + price)
        taskObject.img = buy.thumbnailImage;
        taskObject.rating = buy.customerRating;
        taskObjects.push(taskObject);
      };
    res.render('search_result', {taskObjects: taskObjects})
   })
  }

});


app.get('/search', (req, res) => {
  res.render('main_search');
});



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
