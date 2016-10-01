$(document).ready(function() {
$(document).foundation()

    $("#buy, #eat, #read, #watch").click(function(event) {
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

  // console.log("hello");