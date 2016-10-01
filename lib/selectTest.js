const show = require('./select');

const user = process.argv[2];
const results = function(results) {
  console.log(results);
};

show.usersItems(user, results);
