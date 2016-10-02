$(document).ready(function() {

  function createElement(items) {
    let $item = $('<ul>').addClass('listcontainer').html(
      '<div id="namecontainer">' +
        '<h2>' +  items.item_name + '</h2>' +
        '<input type="image" src="../images/check.png" id="item">' +
        '<div class="togglecontainer">' +
          '<li>' +
            '<div class="item-content">' +
              '<img src="http://placehold.it/250x150"/>' +
              '<div class="synopsis" id="scrollContainer">' + items.html_block + '</div>' +
              '<div class="buttons">' +
                '<p><input type="image" src="../images/check.png" class="sidebuttons delete"><p>' +
                '<a href="#" class="sidebuttons"><i class="fi-x"></i></a>' +
              '</div>' +
            '</div>' +
          '</li>' +
        '</div>' +
      '</div>'
    );
    return $item;
  }

  function renderitems(items) {
    items.forEach( (itemData) => {
      let $item = createElement(itemData);
      $('#' + itemData.item_category).append($item)
    });
  }

  (function loaditems() {
    $.ajax({
      url: '/items',
      method: 'GET',
      success: renderitems
    });
  }());

  // $( "#item" ).click(function(e) {
  //   e.preventDefault()
  //   $(this).closest(".togglecontainer").slideToggle("slow");
  // });

  $('#buy, #read, #eat, #watch').on('click', '#item', function (e) {
    e.preventDefault();
    $(this).parents('#namecontainer').children('.togglecontainer').slideToggle("slow");
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
