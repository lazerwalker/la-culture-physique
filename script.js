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

$(document).on('touchend mouseup keyup', '#end', function(e) {
  $("#end").fadeOut(1000, function() {
    $("#title").fadeIn(1000)
  })
});

$(document).on('touchend mouseup keyup', '#title', function(e) {
  if (e.type === "keyup" && e.keyCode !== 32) { return }
  // Kill me
  window.location = "ipc://playsong"

  var songLength = (2*60 + 37) * 1000 + 500 // includes wiggle-room
  setTimeout(function() {
    $("#game").fadeOut(1000, function() {
      $("#end").fadeIn(1000)
    })
  }, songLength)

  $("#title").fadeOut(1000, function() {
    $("#intro").fadeIn(1000, function() {
      setTimeout(function() {
        $("#intro").fadeOut(1500, function() {
          $("#game").fadeIn(1700)
        })
      }, 7700);
    });    
  });
})