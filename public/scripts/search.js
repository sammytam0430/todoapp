$(document).ready(function() {

  $('#todocontainer').on('submit', '.item_form', function(e) {
    e.preventDefault();
    const item_name = $(this).find('.item_name').html();
    const item_category = $(this).find('.item_category').html();
    const html_block = $(this).find('.taskObject').html();
    console.log('here');
    $.ajax({
      url: '../../items',
      method: 'POST',
      data: { item_name: item_name, item_category: item_category, html_block: html_block },
      dataType: 'json',
      success: function(){}
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
