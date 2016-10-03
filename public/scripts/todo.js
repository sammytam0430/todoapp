$(document).ready(function() {

  function createElement(items) {
    items.html_block = JSON.parse(items.html_block);
    let $item = $('<ul>').addClass('listcontainer').html(
      '<div id="namecontainer">' +
        '<h2>' +  items.item_name + '</h2>' +
        '<input type="image" src="../images/check.png" id="item">' +
        '<div class="togglecontainer">' +
          '<li>' +
            '<div class="item-content">' +
              '<img src="' + items.html_block.img + '"/>' +
              '<div class="synopsis" id="scrollContainer">' + items.html_block.desc + '</div>' +
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

  $('#buy, #read, #eat, #watch').on('click', '#item', function (e) {
    e.preventDefault();
    $(this).parents('#namecontainer').children('.togglecontainer').slideToggle();
  });

});
