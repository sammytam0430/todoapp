
const api = require('./apiModules')

$(function()) {
  $('.submit').submit(function(e){
    options = $(this).closest('textarea').val().split(" ").join("+");
    if($(this).closest(#options).val() == "watch"){
      api.getMovies(options, function(movieInfo){
      title = movieInfo.Title;
      genre = movieInfo.Genre;
      runTime = movieInfo.runTime;
      imdbRating = movieInfo.imdbRating;
      actors = movieInfo.Actors;
      plot = movieInfo.Plot;
      console.log(title, genre, runTime, imdbRating, plot, actors);
      })
    }
    if($(this).closest(#options).val() == "eat") {
      getToken(function(token){
        getEat(options, token, function(eatery){
          console.log(eatery[0]);
        })
     })
    }
  }
});


// $(this).closest(#options).val()


// if( === eat) {
//   function run() {
//     getToken(function(token){
//       getEat(options, token, function(eatery){
//         return eatery
//       })
//     })
//   }
// }