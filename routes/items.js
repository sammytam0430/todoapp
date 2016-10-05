"use strict";

const router = require('express').Router();
const show = require('../lib/select');
const insert = require('../lib/insert');

router.get('/items', (req, res) => {
  show.detailFalse( (results) => {
    // if (err) return res.send(err);
    res.set('Content-Type', 'application/json');
    res.send(results);
  });
});

router.get('/completedItems', (req, res) => {
  show.detailTrue( (results) => {
    // if (err) return res.send(err);
    res.set('Content-Type', 'application/json');
    res.send(results);
  });
});

module.exports = router;
