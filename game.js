var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  if (started) {
    check(userClickedPattern.length-1);
  }

  if (!started) {
    var wrongTune = "wrong";
    playSound(wrongTune);
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").html("Game Over, Press Any Key to Restart");
    startOver();
  }
});

function nextSequence() {
  userClickedPattern=[];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("h1").html("Level " + level);
}

function check(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
      if (userClickedPattern.length===gamePattern.length){
        setTimeout(function(){
          nextSequence();
        },1000);

      }


    } else {
      var wrongTune = "wrong";
      playSound(wrongTune);
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);
      $("h1").html("Game Over, Press Any Key to Restart");
      startOver();
    }
}
  function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

  function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
      $("#" + currentColour).removeClass("pressed")
    }, 100);
  }
  $(document).keydown(function() {
    if (!started) {
      $("h1").html("Level "+level);
      nextSequence();
      started = true;
    }
  });

function startOver(){
  started=false;
  level=0;
  gamePattern=[];

}
