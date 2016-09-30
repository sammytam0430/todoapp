$(document).ready(function() {
$(document).foundation()

$(function(){
    $("#submitbuy, submiteat, submitread, submitwatch").click(function(event) {
        $(this).next('.togglecontainer').slideToggle();
    });
});
  // $('#submit').click(function() {
  //   $('.togglecontainer').slidetoggle("slow", function() {
  //   });
  // });

// var hiddenBox = $( "togglecontainer" );
// $( "#togglecontainer" ).on( "click", function( event ) {
//   hiddenBox.show();
// });

})
  // console.log("hello");