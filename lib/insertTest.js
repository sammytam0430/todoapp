"use strict";

const insert = require('./insert');

const user = process.argv[2];
const category = process.argv[3];
const item = process.argv[4];
const results = function(results) {
  console.log(results);
};

insert.addNewItem(user, category, item, results);
