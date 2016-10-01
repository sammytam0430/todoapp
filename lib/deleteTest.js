const delete = require('./delete');

const user = process.argv[2];
const itemName = process.argv[3];
const results = function(results) {
  console.log(results);
};

delete.deleteItem(user, itemName, results);
