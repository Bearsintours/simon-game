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
var padsNumber = {
  0: "green",
  1: "red",
  2: "yellow",
  3: "blue"
};


switchBtn.addEventListener("click", function() {
  on = true;
  screen.classList.toggle("hidden");
});

strictModeBtn.addEventListener("click", function() {
  strictMode = true;
  strictModeLed.classList.toggle("led-on");
})

// Helper functions:

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
  clickColor();
}

function clickColor() {
  green.addEventListener("click", function() {
    green.classList.add("green-on");
    var stop = setTimeout(function() {
      green.classList.remove("green-on")
    }, 1000);
  })
}



getColor();
