"use strict";

require('dotenv').config();
const PORT = process.env.PORT || 8080;
const connect = require('connect')
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require('method-override')

app.use(methodOverride('_method'))
app.use(require('./routes/items.js'));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const knex = require('knex')({
  client: 'pg',
  connection: {
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
    host : process.env.DB_HOST,
    port : process.env.DB_POST,
    ssl : process.env.DB_SSL
  }
});

const insert = require('./lib/insert.js');
const remove = require('./lib/delete.js');
const update = require('./lib/update.js');
const api = require('./public/scripts/apiModules.js')
const call = require('./public/scripts/apiCalls.js')


// HTML
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

app.get('/', (req, res) => {
  res.render('todo');
});

app.get('/search', (req, res) => {
  res.render('main_search');
});


app.get('/complete', (req, res) => {
  res.render('complete');
});

app.post('/', (req, res) =>{
  const item = JSON.parse(req.body.test);
  insert.add(item, (results) => {
    console.log(results)
  });
  res.redirect('/');
});

app.put('/', (req, res) => {
  const status = req.body.true;
  const item = req.body.item;
  update.updateItem(status, item, (results) => {
    console.log(results)}
  );
  res.redirect('/complete');
});

app.delete('/', (req, res) => {
  const item = req.body.item;
  remove.deleteItem(item, (results) => {
    console.log(results)
  });
  res.redirect('/');
});

app.delete('/complete', (req, res) => {
  const item = req.body.item;
  remove.deleteItem(item, (results) => {
    console.log(results)
  });
  res.redirect('/complete');
});

app.post('/search/result', (req, res) => {
  console.log(req.body.type);
  console.log(req.body.userinput);
  const taskType = req.body.type;
  const userTask = req.body.userinput.split(" ").join("+");

  if(taskType === "watch") {
    const taskPromises = call.taskObject.watch(userTask, taskType, res, req, (taskPromises) => {
      if (taskPromises == "no results") {
        res.redirect('/search')
      } else {
        Promise.all(taskPromises).then((taskObjects) => {
          res.render('search_result', { taskObjects: taskObjects })
        });
      }
    });
  };

  if(taskType === "read") {
    const userInput = req.body.userinput;
    const taskObjects = call.taskObject.read(userInput, taskType, res, req, (taskObjects) => {
      if (taskObjects == "no results") {
        res.redirect('/search')
      } else {
        res.render('search_result', { taskObjects: taskObjects })
      };
    })
  };

  if(taskType === "eat") {
    const taskObjects = call.taskObject.eat(userTask, taskType, res, req, (taskObjects) => {
      if (taskObjects == "no results") {
        res.redirect('/search')
      } else {
        res.render('search_result', { taskObjects: taskObjects })
      };
    })
  };

  if(taskType === "buy") {
    const taskObjects = call.taskObject.buy(userTask, taskType, res, req, (taskObjects) => {
      if (taskObjects == "no results") {
        res.redirect('/search')
      } else {
        res.render('search_result', { taskObjects: taskObjects })
      };
    })
   }

});
