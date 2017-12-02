// Global variables:

var screen = document.getElementById("screen");
var switchBtn = document.getElementById("on-off-btn");
var startBtn = document.getElementById("start-btn");
var strictModeBtn = document.getElementById("mode-btn");
var strictModeLed = document.getElementById("led");
var green = document.getElementById("green");
var red = document.getElementById("red");
var yellow = document.getElementById("yellow");
var blue = document.getElementById("blue");
var on = false;
var strictMode = false;
var computersMove, playersMove;
var storeColors = [];
var storePlayersMove = [];
var movesPossible = [0, 1, 2, 3];
var padColors = ["green", "blue", "red", "yellow"];
var pads = document.getElementsByClassName("pads");
var padsNumber = {
  0: "green",
  1: "red",
  2: "yellow",
  3: "blue"
};
var score = 0;


switchBtn.addEventListener("click", function() {
  screen.classList.toggle("hidden");
  if (on == true) {
    on = false;
  } else on = true;
});


strictModeBtn.addEventListener("click", function() {
  if (on == true) {
    strictMode = true;
    strictModeLed.classList.toggle("led-on");
  }
})

startBtn.addEventListener("click", function() {
  if (on == true) {
    var init = setTimeout(function() {
      startNewGame();
    }, 1000);
  }
})


// Helper functions:

function startNewGame() {
  var storeColors = [];
  var storePlayersMove = [];
  getColor();
}


function getColor() {
  var randomNum = Math.floor(Math.random() * 4);
  var color = padsNumber[randomNum];
  storeColors.push(color);
  var pad = document.getElementById(color);
  var id = pad.id;
  console.log(id);
  pad.classList.add(id + "-on");
  var stop = setTimeout(function() {
    pad.classList.remove(id + "-on");
  }, 1000);
  score++;
  screen.innerHTML = score;
  clickColor();
}

function clickColor() {
  for (var i = 0; i < pads.length; i++) {
    pads[i].addEventListener("click", function() {
      var pad = this;
      var id = this.id;
      console.log(id);
      this.classList.add(id + "-on");
      var stop = setTimeout(function() {
        pad.classList.remove(id + "-on")
      }, 1000);
    })
  }
}
