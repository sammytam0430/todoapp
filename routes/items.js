const router = require('express').Router();
const show = require('../lib/select');

const results = function(results) {
  console.log(results);
};

show.detail(results);

router.get('/items', (req, res) => {
  show.detail
})
