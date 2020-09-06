
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function(e) {
  if (!started && e.key === "Enter") {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    $("body").removeClass("game-over");
    $(".btn").css("pointer-events", "auto");
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Enter to Restart");
      $(".btn").css("pointer-events", "none");
      startOver();
    }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}



// $(document).keydown(function(e) {
//   let randomNumber = Math.floor(Math.random() * (".btn").length);
//   if (e.key === "Enter"){
//   $("h1").text("Level 1");
//   }
//   else {
//     alert("Wrong key!");
//   }
//   $(".btn").eq(randomNumber).fadeOut().fadeIn();
// });
//
// $(".btn").on("click", function() {
//   $(this).html("<audio src= 'sounds/red.mp3'></audio>");
//   $(this).addClass("pressed");
//   that = this
//   setTimeout(function() {
//     $(that).removeClass('pressed');
//   }, 100);
// });
