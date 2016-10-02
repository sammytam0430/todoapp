$(document).ready(function() {

  $('#todocontainer').on('click', '#item', function(e) {
    e.preventDefault();
    const $this = $(this)
    console.log($this.attr('method'));
    // $.ajax({
    //   url: $this.attr('action'),
    //   method: $this.attr('method'),
    //   data: $this.serialize(),
    //   dataType: 'json',
    //   success: function (tweet) {
    // //     $("#new-tweet").find('textarea').val('');
    // //     $("#new-tweet").find(".counter").html('140');
    // //     $('#tweet-container').prepend(createTweetElement(tweet));
    //   }
    // });
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
