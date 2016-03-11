$(document).on('touchstart', function() {
  $(".leg").addClass('down')
})

$(document).on('touchend', function() {
  $(".leg").removeClass('down')
})