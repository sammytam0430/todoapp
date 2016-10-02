var api = require('./apiModules.js')


module.exports = {
  taskObject: {
    read: (userInput, taskType, res, req, cb) => {
      api.getBooks(userInput, (bookInfo) => {
        var taskObjects = [];
        for (let i = 0; i < 10; i++) {
          let taskObject = {};
          book = bookInfo.items[i].volumeInfo;
          taskObject.name = book.title;
          taskObject.desc = book.authors + '\n' + book.description + '\n' + book.publishedDate;
          taskObject.rating = book.averageRating;
          if(book.imageLinks) {
           taskObject.img = book.imageLinks.thumbnail;
          } else {
           taskObject.img = "../images/shia.jpg";
          }
          taskObject.searchVals = {type: taskType, userInput: req.body.userinput};
          taskObjects.push(taskObject);
        }
        cb(taskObjects)
       });
    },

  watch: (userTask, taskType, res, req, cb) => {
    api.getTitles(userTask, (titles) => {
        var taskPromises = [];
        titles.forEach((title) => {
          var p = new Promise((resolve, reject) => {
            api.getMovie(title, (movieInfo) => {
              var taskObject = {};
              taskObject.name = movieInfo.Title;
              taskObject.rating = movieInfo.imdbRating;
              taskObject.desc = 'Actors: ' + movieInfo.Actors + ', Genre: ' + movieInfo.Genre + '<%<br/>%>  ' + movieInfo.Plot + '<br/>Runtime: ' + movieInfo.Runtime;
              taskObject.img = movieInfo.Poster;
              taskObject.searchVals = {type: taskType, userInput: req.body.userinput};
              resolve(taskObject);
            });
          });
          taskPromises.push(p);
        });
        cb(taskPromises);
      })
  },

    buy: (userTask, taskType, res, req, cb) => {
      api.getBuy(userTask, (buyInfo) => {
        let numItems = () => {
          if(buyInfo.items.length < 10) {
            return buyInfo.items.length;
          } else { return 10; }
        };
        var taskObjects = [];
        for (let i = 0; i < numItems(); i++) {
          let taskObject = {};
          buy = buyInfo.items[i];
          taskObject.name = buy.name;
          if(buy.salePrice) {price = buy.salePrice}
          else {price = buy.mrsp}
          if(buy.shortDescription) {taskObject.desc = buy.shortDescription + '\nPrice: ' + price}
          else {taskObject.desc = buy.longDescription + '\nPrice: ' + price}
          taskObject.img = buy.thumbnailImage;
          taskObject.rating = buy.customerRating;
          taskObject.searchVals = {type: taskType, userInput: req.body.userinput};
          taskObjects.push(taskObject);
       }
       cb(taskObjects);
     });
    },

    eat: (userTask, taskType, res, req, cb) => {
      api.getToken((yelpToken) => {
        api.getEat(userTask, yelpToken, (eatInfo) => {
          let numRest = () => {
            if (eatInfo.businesses.length < 10) {
              return eatInfo.businesses.length;
            } else { return 10; }
        };
        var taskObjects = [];
        for (let i = 0; i < numRest(); i++) {
          let taskObject = {};
          eat = eatInfo.businesses[i];
          taskObject.name = eat.name;
          taskObject.rating = eat.rating;
          taskObject.desc = eat.location.address1 + ", " + eat.location.city + '\nCuisine: '
            + eat.categories[0].title + '\nContact number: ' + eat.phone + '\nPrice Level: ' + eat.price
          taskObject.img = eat.image_url;
          taskObject.searchVals = {type: taskType, userInput: req.body.userinput};
          taskObjects.push(taskObject);
        };
      cb(taskObjects);
    });
     });
    }
  }
}