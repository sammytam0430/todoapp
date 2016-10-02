$(document).ready(function(){

  $('#todocontainer').find('#read').on('click', function(e) {
    e.preventDefault();
    const $this = $(this).parents('.listcontainer')
    console.log($this);
  });


});
