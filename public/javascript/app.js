$(document).ready(function() {

  $("#buy, #eat, #read, #watch").click(function(event) {
    $(this).next('.togglecontainer').slideToggle();
  });

  $("div.searchresults:not(:first)").each(function(){
      $(this).hide();
  });

  $(".nextitem").click(function(event) {
    $(this)
      .closest('.searchresults')
      .next('.searchresults')
      .slideToggle();
      $(this)
      .closest('.searchresults').hide();
  });

  //   $(".lastitem").click(function(event) {
  //   $(this)
  //     .closest('.searchresults')
  //     .last('.searchresults')
  //     .slideToggle();
  //     $(this)
  //     .prev('.searchresults').show();
  // });
});

// function newToDo(item_name, item_category, html_block, status) {
//     var toDo = $('${<ul class="listcontainer">}')//.addClass('tweet');
//     toDo.append($(`
//       <div class="namecontainer">
//         <h2>"${taskObject.name}</h2>
//         <input type="image" src="../images/check.png" id="${taskType}">
//           <div class="togglecontainer">
//             <li>
//               <div class="item-content">
//                 <img src="${taskObject.img}"/>
//                 <div class="synopsis" id="scrollContainer">${taskObject.desc}
//                 </div>
//                 <p class="rating">${taskObject.rating}</p>
//                 <a href="${taskObject.url}" id="url">View the trailer here</a>
//                 <div class="buttons">
//                   <p><input type="image" src="../images/check.png" class="sidebuttons delete">
//                   <p><input type="image" src="../images/bird.png" class="sidebuttons complete">
//                 </div>
//               </div>
//             </li>
//           </div>
//       </div>`
//       ));
//     return toDo;
//   };


  // $("").on("submit", function (event) {
  //   event.preventDefault();
  //   var tweet = $(this).serialize();
  //   $.ajax( {
  //     url: '/search_result',
  //     method: 'GET',
  //     data: taskObject,
  //     dataType: 'json',
  //     success: function() {
  //        $('#tweetcontai').append(newToDo(cb));
  //     }
  //   });
  // });
