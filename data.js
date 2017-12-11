(function() {

  // Global variables

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
  var index, sound;
  var playersTurn = false;

  // Event listeners

  switchBtn.addEventListener("click", function() {
    screen.innerHTML = "--";
    screen.classList.toggle("hidden");
    if (on == true) {
      on = false;
      strictMode = false;
      strictModeLed.classList.remove("led-on");
      sound.pause();
    } else {
      on = true;
      screen.innerHTML = "--";
      score = 0;
      storeColors = [];
      storePlayersMove = [];
    }
  });

  strictModeBtn.addEventListener("click", function() {
    if (on == true) {
      strictModeLed.classList.toggle("led-on");
      if (strictMode == true) {
        strictMode = false;
      } else {
        strictMode = true;
      }
    }
  })

  startBtn.addEventListener("click", function() {
    if (on == true) {
      startNewGame();
    }
  })


  // Helper functions

  function reset() {
    storeColors = [];
    storePlayersMove = [];
    score = 0;
  }

  function startNewGame() {
    reset()
    getColor();
  }

  function getColor() {
    playersTurn = false;
    var randomNum = Math.floor(Math.random() * 4);
    var color = padsNumber[randomNum];
    var pad = document.getElementById(color);
    var id = pad.id;
    storeColors.push(id);
    console.log("Colors to play: " + storeColors);
    score++;
    var delay = setTimeout(function() {
      playStoredColors(storeColors);
      screen.innerHTML = score;
    }, 1200)
    clickColor();
  }

  function clickColor() {
    for (var i = 0; i < pads.length; i++) {
      pads[i].addEventListener("click", printColorClicked);
    }
  }

  function printColorClicked() {
    if (storePlayersMove.length < storeColors.length && playersTurn == true) {
      var pad = this;
      var id = this.id;
      sound = document.getElementById(id + "-audio");
      storePlayersMove.push(id);
      console.log("Color played : " + storePlayersMove);
      this.classList.add(id + "-on");
      sound.play();
      var stop = setTimeout(function() {
        pad.classList.remove(id + "-on")
      }, 300);
      index = storePlayersMove.length - 1;
      checkColor(index);
    }
  }

  function playColor(color) {
    var pad = document.getElementById(color);
    var id = pad.id;
    sound = document.getElementById(id + "-audio");
    pad.classList.add(id + "-on");
    sound.play();
    var stop = setTimeout(function() {
      pad.classList.remove(id + "-on");
    }, 500);
  }

  function playStoredColors(arr) {
    var i = 0;

    function print() {
      playColor(arr[i]);
      i++;
      if (i < arr.length) {
        setTimeout(print, 1000);
      } else {
        setTimeout(function() {
          playersTurn = true;
        }, 500)
      }
    }
    print();
  }

  function checkColor(idx) {
    if (storeColors[idx] !== storePlayersMove[idx]) {
      if (strictMode == true) {
        printMessage("!!");
        sound.pause();
        setTimeout(startNewGame, 1000);
      } else {
        printMessage("!!");
        var delay = setTimeout(function() {
          screen.innerHTML = score;
          playStoredColors(storeColors);
          storePlayersMove = [];
        }, 2000)
        clickColor();
      }
    } else if (storeColors.length == storePlayersMove.length) {
      if (score == 20) {
        printMessage("WIN");
      } else {
        storePlayersMove = [];
        getColor();
      }
    } else clickColor();
  }

  function printMessage(message) {
    var times = 0;
    screen.style.vivibility = "hidden";
    screen.innerHTML = message;
    var blink = setInterval(function() {
      times++;
      if (times === 4) {
        clearInterval(blink);
      }
      screen.style.visibility = (screen.style.visibility === "hidden" ? "" : "hidden");
    }, 200);
  }

})()
