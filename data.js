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
    startNewGame();
  }
})


// Helper functions:

function startNewGame() {
  var init = setTimeout(function() {
    storeColors = [];
    storePlayersMove = [];
    score = 0;
    getColor();
  }, 2000);
}


function getColor() {
  var randomNum = Math.floor(Math.random() * 4);
  var color = padsNumber[randomNum];
  var pad = document.getElementById(color);
  var id = pad.id;
  storeColors.push(id);
  console.log("Colors to play: " + storeColors);
  score++;
  screen.innerHTML = score;
  playStoredColors(storeColors);
  clickColor();
}


function clickColor() {
  for (var i = 0; i < pads.length; i++) {
    pads[i].addEventListener("click", function() {
      if (storePlayersMove.length < storeColors.length) {
        var pad = this;
        var id = this.id;
        storePlayersMove.push(id);
        console.log("Color played : " + storePlayersMove);
        this.classList.add(id + "-on");
        var stop = setTimeout(function() {
          pad.classList.remove(id + "-on")
        }, 1000);
      }
    })
  }
}

function check() {
  for (var i = 0; i < storePlayersMove.length; i++) {
    if (storePlayersMove[i] !== storeColors[i]) {
      console.log("incorrect");
      startNewGame();
    }
  }
  if (storePlayersMove.length == storeColors.length) {
    getColor();
  }
}

function playColor(color) {
  var pad = document.getElementById(color);
  var id = pad.id;
  pad.classList.add(id + "-on");
  var stop = setTimeout(function() {
    pad.classList.remove(id + "-on");
  }, 1000);
}

function playStoredColors(arr) {
  var i = 0;

  function print() {
    playColor(arr[i]);
    i++;
    if (i < arr.length) {
      setTimeout(print, 2000);
    }
  }
  print();
}

function checkColor() {
  for (var i = 0; i < storeColors.length; i++) {
    if (storeColors[i] !== storePlayersMove[i]) {
      return false;
    }
  }
  return true;
}
