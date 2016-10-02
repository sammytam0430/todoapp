$(document).ready(function(){

  function createElement(items) {
    let $item = $('<ul>').addClass('listcontainer').html(
      '<div class="namecontainer"><h2>' + items.item_name + '</h2><input type="image" src="../images/check.png" id="' + items.item_category + '"><div class="togglecontainer"><li><div class="item-content"><img src="http://placehold.it/250x150"/><div class="synopsis" id="scrollContainer">' + items.html_block + '</div><div class="buttons"><p><input type="image" src="../images/check.png" class="sidebuttons delete"><p><a href="#" class="sidebuttons"><i class="fi-x"></i></a></div></div></li></div></div>');
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

});
