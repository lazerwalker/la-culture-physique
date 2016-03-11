var bottomTimeout, topTimeout;
var reachedBotton = false;
var reachedTop = false;
var count = 0;

checkState = function() {
  if (reachedBottom && reachedTop) {
    count++;
    console.log("Completed " + count + " exercises")

    reachedTop = false;
    reachedBottom = false;
  }
}


$(document).on('touchstart mousedown keydown', function(e) {
  if(e.type === "keydown" && e.keyCode !== 32) {
    return;
  }
  $(".leg").addClass('down');

  // TODO: Try to listen for CSS animation end
  clearTimeout(topTimeout)
  bottomTimeout = setTimeout(function() {
    reachedBottom = true;
  }, 500)
})

$(document).on('touchend mouseup keyup', function(e) {
  if(e.type === "keyup" && e.keyCode !== 32) {
    return;
  }

  clearTimeout(bottomTimeout);
  topTimeout = setTimeout(function() {
    reachedTop = true;
    checkState();
  }, 500)

  $(".leg").removeClass('down');
})

