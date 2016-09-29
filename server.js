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

app.get('/search', (req, res) => {
  res.render('main_search');
});



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
