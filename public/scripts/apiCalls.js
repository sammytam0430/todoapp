"use strict";

const api = require('./apiModules.js')

module.exports = {

  taskObject: {

    read: (userInput, taskType, res, req, cb) => {
      api.getBooks(userInput, (bookInfo) => {
        let taskObjects = [];
        let description;
        if (bookInfo.totalItems == 0) {
          taskObjects = "no results"
          return cb(taskObjects)
        }
        console.log(bookInfo);
        for (let i = 0; i < 10; i++) {
          let taskObject = {};
          const book = bookInfo.items[i].volumeInfo;
          taskObject.name = book.title;
          if (!book.description) {
            description = 'Sorry no description of this book is available';
          } else {
            description = book.description;
          }
          taskObject.desc = 'Author: ' + book.authors + '\n  ' + description + '\n' + 'Written: ' + book.publishedDate;
          taskObject.rating = book.averageRating;
          if (book.imageLinks) {
           taskObject.img = book.imageLinks.thumbnail;
          } else {
           taskObject.img = "../images/shia.jpg";
          }
          taskObject.url = book.infoLink
          taskObject.searchVals = { type: taskType, userInput: req.body.userinput };
          taskObjects.push(taskObject);
        }
        cb(taskObjects)
       });
    },

    watch: (userTask, taskType, res, req, cb) => {
      api.getTitles(userTask, (titles) => {
          if (titles == "no results") {return cb(titles)}
          else {
          const taskPromises = [];
          titles.forEach((title) => {
            const p = new Promise((resolve, reject) => {
              api.getMovie(title, (movieInfo) => {
                const taskObject = {};
                taskObject.name = movieInfo.Title;
                taskObject.rating = movieInfo.imdbRating;
                taskObject.desc = 'Actors: ' + movieInfo.Actors + '. Genre: ' + movieInfo.Genre + '\n  ' + movieInfo.Plot + '\nRuntime: ' + movieInfo.Runtime;
                taskObject.img = movieInfo.Poster;
                taskObject.url = "http://www.imdb.com/title/" + movieInfo.imdbID
                taskObject.searchVals = {type: taskType, userInput: req.body.userinput};
                resolve(taskObject);
              });
            });
            taskPromises.push(p);
          });
          cb(taskPromises);
        }
      })
    },

    buy: (userTask, taskType, res, req, cb) => {
      api.getBuy(userTask, (buyInfo) => {
        if (buyInfo.errors || buyInfo.numItems === 0) {
           let taskObjects = "no results"
            return cb(taskObjects)
        } else {
          let numItems = () => {
            if (buyInfo.items.length < 10) {
              return buyInfo.items.length;
            } else { return 10; }
          };
          const taskObjects = [];
          for (let i = 0; i < numItems(); i++) {
            let taskObject = {};
            const buy = buyInfo.items[i];
            taskObject.name = buy.name;
            let price;
            if (buy.salePrice) {
              price = buy.salePrice
            } else {
              price = buy.mrsp
            }
            if (buy.shortDescription) {
              taskObject.desc = buy.shortDescription + '\nPrice: ' + price
            } else {
              taskObject.desc = '  ' + buy.longDescription + '\nPrice: ' + price
            }
            taskObject.img = buy.thumbnailImage;
            taskObject.rating = buy.customerRating;
            taskObject.url = buy.productUrl;
            taskObject.searchVals = {type: taskType, userInput: req.body.userinput};
            taskObjects.push(taskObject);
          }
          cb(taskObjects);
        }
      });
    },

    eat: (userTask, taskType, res, req, cb) => {
      api.getToken((yelpToken) => {
        api.getEat(userTask, yelpToken, (eatInfo) => {
          if (eatInfo.total == 0) {
            let taskObjects = "no results"
            return cb(taskObjects)
          } else {
            let numRest = () => {
              if (eatInfo.businesses.length < 10) {
                return eatInfo.businesses.length;
              } else { return 10; }
            };
            const taskObjects = [];
            for (let i = 0; i < numRest(); i++) {
              let taskObject = {};
              const eat = eatInfo.businesses[i];
              taskObject.name = eat.name;
              taskObject.rating = eat.rating;
              taskObject.desc = eat.location.address1 + ", " + eat.location.city + '\nCuisine: '
                + eat.categories[0].title + '\nContact number: ' + eat.phone + '\nPrice Level: ' + eat.price
              taskObject.img = eat.image_url;
              taskObject.url = eat.url;
              taskObject.searchVals = {type: taskType, userInput: req.body.userinput};
              taskObjects.push(taskObject);
            };
            cb(taskObjects);
          }
        });
      });
    }

  }

}
