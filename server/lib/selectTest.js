const show = require('./select');

const results = function(item_name, item_category, html_block, status) {
  console.log(item_name, item_category, html_block, status);
};

show.detail(results);
