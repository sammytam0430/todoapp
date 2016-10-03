$(document).ready(function() {

$('#todocontainer').on('submit', '.item_form', function(e) {
  e.preventDefault();
  var item_name = $(this).find('.item_name').html();
  var html_block = $(this).find('.synopsis').html();

  $.ajax({
    url: '../../items',
    method: 'POST',
    data: { item_name: item_name, html_block: html_block },
    dataType: 'json',
    success: function (data) {
      // console.log(data);
      // $("#new-tweet").find('textarea').val('');
      // $("#new-tweet").find(".counter").html('140');
      // $('#tweet-container').prepend(createTweetElement(tweet));
    }
  });
});

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
