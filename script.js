$(document).on('touchstart mousedown keydown', function(e) {
  if(e.type === "keydown" && e.keyCode !== 32) {
    return
  }
  $(".leg").addClass('down')
})

$(document).on('touchend mouseup keyup', function(e) {
  if(e.type === "keyup" && e.keyCode !== 32) {
    return
  }
  $(".leg").removeClass('down')
})