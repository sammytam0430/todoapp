const router = require('express').Router();
const show = require('../lib/select');

// const results = function(results) {
//   console.log(results);
// };
//
// show.detail(results);

router.get('/items', (req, res) => {
  show.detail( (results) => {
    // if (err) return res.send(err);
    res.set('Content-Type', 'application/json');
    res.send(results);
  });
});

module.exports = router;
