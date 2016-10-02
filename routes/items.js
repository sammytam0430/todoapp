const router = require('express').Router();
const show = require('../lib/select');
const insert = require('../lib/insert');

router.get('/items', (req, res) => {
  show.detail( (results) => {
    // if (err) return res.send(err);
    res.set('Content-Type', 'application/json');
    res.send(results);
  });
});

router.post('/items', (req, res) => {
  
});

module.exports = router;
