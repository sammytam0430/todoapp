const update = require('./update');

const user = process.argv[2];
const oldName = process.argv[3];
const newName = process.argv[4];
const results = function(results) {
  console.log(results);
};

update.updateItem(user, oldName, newName, results);
