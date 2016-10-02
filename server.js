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
var call = require('./public/scripts/apiCalls.js')

const express     = require("express");
const app         = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(require('./routes/items.js'));
const bodyParser  = require("body-parser");
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
const PORT = process.env.PORT || 8080;
const connect        = require('connect')
const methodOverride = require('method-override')
app.use(methodOverride('_method'))


// HTML
app.get('/', (req, res) => {
  res.render('todo');
});


//completed tasks list for user
app.get('/completed/:iduser', (req, res) => {

});


// //upon submit from search results page
// app.post('/search/result/:idtask', (req, res) => {

// }


app.post('/search/result', (req, res) => {
  console.log(req.body.type);
  console.log(req.body.userinput);
  var taskType = req.body.type;
  var userTask = req.body.userinput.split(" ").join("+");

  if(taskType === "watch") {
    let taskPromises = call.taskObject.watch(userTask, taskType, res, req, (taskPromises) => {
      Promise.all(taskPromises).then((taskObjects) => {
        res.render('search_result', {taskObjects: taskObjects})
      });
    });
  };

  if(taskType === "read") {
    let userInput = req.body.userinput;
    let taskObjects = call.taskObject.read(userInput, taskType, res, req, (taskObjects) => {
      res.render('search_result', {'taskObjects': taskObjects});
    })
  };

  if(taskType === "eat") {
    let taskObjects = call.taskObject.eat(userTask, taskType, res, req, (taskObjects) => {
      res.render('search_result', {'taskObjects': taskObjects});
    })
  };

  if(taskType === "buy") {
    let taskObjects = call.taskObject.buy(userTask, taskType, res, req, (taskObjects) => {
      res.render('search_result', {'taskObjects': taskObjects});
    })
   }
});

app.get('/search', (req, res) => {
  res.render('main_search');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
