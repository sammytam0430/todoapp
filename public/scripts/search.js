$(document).ready(function() {

  $("div.searchresults:not(:first)").each(function(){
      $(this).hide();
  });

  $("#todocontainer").on('click', '#nextitem', function(e) {
    e.preventDefault();
    console.log('workssss');
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
