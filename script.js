$(document).on('touchstart mousedown', function() {
  $(".leg").addClass('down')
})

$(document).on('touchend mouseup', function() {
  $(".leg").removeClass('down')
})