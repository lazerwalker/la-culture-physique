var bottomTimeout, topTimeout;
var reachedBottom = false;
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

function startTap(e) {
  if(e.type === "keydown" && e.keyCode !== 32) {
    return;
  }
  $(".leg").addClass('up');
  $(".leg").removeClass('down');

  // TODO: Try to listen for CSS animation end
  clearTimeout(topTimeout)
  bottomTimeout = setTimeout(function() {
    reachedBottom = true;
  }, 400)
}

function endTap(e) {
  if(e.type === "keyup" && e.keyCode !== 32) {
    return;
  }

  clearTimeout(bottomTimeout);
  topTimeout = setTimeout(function() {
    reachedTop = true;
    checkState();
  }, 400)

  $(".leg").removeClass('up');
  $(".leg").addClass('down');
}

$(document).on('touchstart mousedown keydown', startTap);
$(document).on('touchend mouseup keyup', endTap);

$(document).one('touchend mouseup keyup', function(e) {
  if (e.type === "keyup" && e.keyCode !== 32) { return }
  $("#title").fadeOut(function() {
    $("#game").fadeIn();    
  });
})

