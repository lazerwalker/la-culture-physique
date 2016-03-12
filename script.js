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

function addMessage(msg) {
  console.log("Showing " + msg)

  $("#game .msg")
    .hide()
    .css({
      left: Math.random() * 60 + 20,
      top: Math.random() * 300,
      "font-size": 20 + Math.random() * 20,
    })
    .html(msg)
    .fadeIn(1000)
}

function startPlayingMessages() {
  console.log("Starting to play")
  var messages = _.shuffle([
    "Ahhhhh",
    "Trés bien!",
    "Trés relaxant!",
    "Vous êtes magnifique!",
    "Marveleux!",
    "La vie est belle",
    "Parfait!",
    "Je vous aime",
    "Super!",
    "Mmmm"
  ])

  var usedMessages = []

  function iter() {
    console.log("In iter")
    if(Math.random() > 0.8) {
      if (messages.length === 0) {
        messages = usedMessages;
        usedMessages = [];
      }

      var msg = _.sample(messages)
      addMessage(msg)
      usedMessages.push(msg)
      messages = _(messages).without(msg)

      setTimeout(function() {
        $("#game .msg").fadeOut(100)
        setTimeout(iter, 500)
      }, 1300)
    } else {
      console.log("Didn't make it")
      setTimeout(iter, 100)
    }
  }

  setTimeout(iter, 1000)
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
      $("#end .num").text(count)
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