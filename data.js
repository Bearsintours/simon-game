(function () {

  /** GLOBAL VARIABLES **/

  var screen = document.getElementById("screen");
  var switchBtn = document.getElementById("on-off-btn");
  var startBtn = document.getElementById("start-btn");
  var strictModeBtn = document.getElementById("mode-btn");
  var strictModeLed = document.getElementById("led");
  var on = false;
  var strictMode = false;
  var playersTurn = false;
  var computersTurn = false;
  var computersMove, playersMove;
  var storeColors = [];
  var storePlayersMove = [];
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


  /** EVENT LISTENERS **/

  switchBtn.addEventListener("click", function () {
    screen.innerHTML = "--";
    screen.classList.toggle("hidden");
    if (on) {
      on = false;
      strictMode = false;
      strictModeLed.classList.remove("led-on");
    } else {
      on = true;
      screen.innerHTML = "--";
      score = 0;
      storeColors = [];
      storePlayersMove = [];
    }
  });

  strictModeBtn.addEventListener("click", function () {
    if (on) {
      strictModeLed.classList.toggle("led-on");
      if (strictMode) {
        strictMode = false;
      } else {
        strictMode = true;
      }
    }
  })

  startBtn.addEventListener("click", function () {
    if (on && !computersTurn) {
      startNewGame();
    }
  })

  /** GAME **/

  // Start game
  function startNewGame() {
    reset();
    printMessage("0");
    setTimeout(getColor, 1000);
  }

  // Reset game
  function reset() {
    storeColors = [];
    storePlayersMove = [];
    score = 0;
  }


/** HELPER FUNCTIONS **/

  // Computer plays
  function getColor() {
    playersTurn = false;
    computersTurn = true;
    var randomNum = Math.floor(Math.random() * 4);
    var color = padsNumber[randomNum];
    var pad = document.getElementById(color);
    var id = pad.id;
    storeColors.push(id);
    console.log("Colors to play: ", storeColors);
    score++;
    var delay = setTimeout(function () {
      playStoredColors(storeColors);
      screen.innerHTML = score;
    }, 1200)
    clickColor();
  }

  // Change color and play audio
  function playColor(color) {
    if (on) {
      var pad = document.getElementById(color);
      var id = pad.id;
      sound = document.getElementById(id + "-audio");
      pad.classList.add(id + "-on");
      sound.play();
      var stop = setTimeout(function () {
        pad.classList.remove(id + "-on");
      }, 500);
    }
  }

  // Play moves with interval
  function playStoredColors(arr) {
    var i = 0;

    function print() {
      playColor(arr[i]);
      i++;
      if (i < arr.length) {
        setTimeout(print, 1000);
      } else {
        setTimeout(function () {
          playersTurn = true;
          computersTurn = false;
        }, 500)
      }
    }
    print();
  }

  function clickColor() {
    for (var i = 0; i < pads.length; i++) {
      pads[i].addEventListener("click", printColorClicked);
    }
  }

  // Flash color and play audio
  function printColorClicked() {
    if (storePlayersMove.length < storeColors.length && playersTurn && on) {
      var pad = this;
      var id = this.id;
      sound = document.getElementById(id + "-audio");
      storePlayersMove.push(id);
      console.log("Color played : ", storePlayersMove);
      this.classList.add(id + "-on");
      sound.play();
      var stop = setTimeout(function () {
        pad.classList.remove(id + "-on")
      }, 300);
      index = storePlayersMove.length - 1;
      checkColor(index);
    }
  }

  // Compare computer and player moves and check for error or win
  function checkColor(idx) {
    if (storeColors[idx] !== storePlayersMove[idx]) {
      if (strictMode) {
        printMessage("!!");
        setTimeout(startNewGame, 1000);
      } else {
        printMessage("!!");
        var delay = setTimeout(function () {
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

  // Print message on screen
  function printMessage(message) {
    var times = 0;
    screen.style.vivibility = "hidden";
    screen.innerHTML = message;
    var blink = setInterval(function () {
      times++;
      if (times === 4) {
        clearInterval(blink);
      }
      screen.style.visibility = (screen.style.visibility === "hidden" ? "" : "hidden");
    }, 200);
  }

})()