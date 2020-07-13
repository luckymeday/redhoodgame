/*
  Code modified from:
  http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
  using graphics purchased from vectorstock.com
*/

/* Initialization.
Here, we create and add our "canvas" to the page.
We also load all of our images. 
*/

let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 500;
document.body.appendChild(canvas);
canvas.style = "position:absolute; margin-left: 22%; top: 23%";

let bgReady, redReady, fly1Ready, fly2Ready, fly3Ready, wolfReady;
let bgImage, redImage, fly1Image, fly2Image, fly3Image, wolfImage;

// let startTime = Date.now();
// const SECONDS_PER_ROUND = 10;
// let elapsedTime = 0;
let score = 0;
let userHistory = {};
let currentUser = "Anonymous";
let highScore = localStorage.getItem("userHighScore") || 0;
let count = 30
let finished = false;


function registerUser() {
  let storeUser = localStorage.getItem("userHistory");
  if (storeUser !== null) {
    userHistory = JSON.parse(storeUser);
  }
  let userName = document.getElementById("user").value;
  userName = userName.trim();
  if (userName != null && userName != "") {
    if (userHistory[userName] === undefined) {
      userHistory[userName] = 0;
    }
    currentUser = userName;
    document.getElementById("user").value = null;
  }
  updateScore();
}

function updateScore() {
  let round = "";
  bestScore = 0;
  if (userHistory !== null) {
    for (let key in userHistory) {
      round += `${key}: ${userHistory[key]}<br>`
      bestScore = Math.max(userHistory[key], bestScore);
    }
    document.getElementById("round").innerHTML = round;
    document.getElementById("best-score").innerHTML = `${bestScore}`;
  }
}


let counter = function () {
  count--
  if (count <= 0) {
    clearInterval(counter);
    //set game to finished
    finished = true;
    count = 0;
    // hide red and fly
    redReady = false;
    fly1Ready = false;
    fly2Ready = false;
    fly3Ready = false;
    wolfReady = false;
    // move red out of canvas
    redX = -600;
    redY = -600;
  }
};
setInterval(counter, 1000);

function loadImages() {
  bgImage = new Image();
  bgImage.onload = function () {
    // show the background image
    bgReady = true;
  };
  bgImage.src = "images/bg.png";

  // red image 40px x 77px
  redImage = new Image();
  redImage.onload = function () {
    // show the red image
    redReady = true;
  };
  redImage.src = "images/red.png";

  // fly image 80px x 80px
  fly1Image = new Image();
  fly1Image.onload = function () {
    // show the fly image
    fly1Ready = true;
  };
  fly1Image.src = "images/fly.png";

  fly2Image = new Image();
  fly2Image.onload = function () {
    // show the fly image
    fly2Ready = true;
  };
  fly2Image.src = "images/fly.png";

  fly3Image = new Image();
  fly3Image.onload = function () {
    // show the fly image
    fly3Ready = true;
  };
  fly3Image.src = "images/fly.png";

  // wolf image 40px x 71px
  wolfImage = new Image();
  wolfImage.onload = function () {
    // show the wolf image
    wolfReady = true;
  };
  wolfImage.src = "images/wolf.png";

  finished = false
}

/** 
 * Setting up our characters.
 * 
 * Note that redX represents the X position of our red.
 * redY represents the Y position.
 * We'll need these values to know where to "draw" the red.
 * 
 * The same applies to the fly.
 */

let redX = canvas.width / 2;
let redY = 420;

let fly1X = Math.floor(Math.random() * (canvas.width - 80));
let fly1Y = -20;

let fly2X = Math.floor(Math.random() * (canvas.width - 80));
let fly2Y = -140;

let fly3X = Math.floor(Math.random() * (canvas.width - 80));
let fly3Y = -150;

let wolfX = Math.floor(Math.random() * (canvas.width - 40));
let wolfY = -270;

/** 
 * Keyboard Listeners
 * You can safely ignore this part, for now. 
 * 
 * This is just to let JavaScript know when the user has pressed a key.
*/
let keysDown = {};
function setupKeyboardListeners() {
  // Check for keys pressed where key represents the keycode captured
  // For now, do not worry too much about what's happening here. 
  addEventListener("keydown", function (key) {
    keysDown[key.keyCode] = true;
  }, false);

  addEventListener("keyup", function (key) {
    delete keysDown[key.keyCode];
  }, false);
}

/**
 *  Update game objects - change player position based on key pressed
 *  and check to see if the fly has been caught!
 *  
 *  If you change the value of 5, the player will move at a different rate.
 */

let update = function () {
  if (finished == true) {
    clearInterval(counter);
    return 0
  }

  // let count = 30
  // let counter = function () {
  //   count--
  //   if (count <= 0) {
  //     clearInterval(counter);
  //     //set game to finished
  //     finished = true;
  //     count = 0;
  //     // hide monster and hero
  //     fly1Ready = false;
  //     fly2Ready = false;
  //     fly3Ready = false;
  //     redReady = false;
  //     wolfReady = false;
  //     // move hero out of canvas
  //     redX = -600;
  //     redY = -600;
  //   }
  // };// Update the time.

  // if ((SECONDS_PER_ROUND - elapsedTime) <= 0) {
  //   finished= true;
  //   return;
  // }
  // elapsedTime = Math.floor((Date.now() - startTime) / 1000);

  // if (38 in keysDown) { // Player is holding up key
  //   redY -= 5;
  // }
  // if (40 in keysDown) { // Player is holding down key
  //   redY += 5;
  // }
  if (37 in keysDown) { // Player is holding left key
    redX -= 5;
  }
  if (39 in keysDown) { // Player is holding right key
    redX += 5;
  }
  // flyX = flyX + 5

  // for each item(make sure with axis)
  fly1Y += 2.5;
  fly2Y += 2.5;
  fly3Y += 2.5;
  wolfY += 2.5;

  if (fly1Y == canvas.height) {
    fly1YX = Math.floor(Math.random() * (canvas.width - 80));
    fly1Y = -50;

  }
  else if (fly2Y == canvas.height) {
    fly2X = Math.floor(Math.random() * (canvas.width - 80));
    fly2Y = -150;
  }
  else if (fly3Y == canvas.height) {
    fly3X = Math.floor(Math.random() * (canvas.width - 80));
    fly3Y = -250;
  }
  else if (wolfY == canvas.height) {
    wolfY = Math.floor(Math.random() * (canvas.width - 71));
    wolfY = -450;
  }

  // Make sure the character doesn't go beyond canvas parameters
  if (redX < 0) {
    redX = 0
  }
  else if (redX > canvas.width - 40) {
    redX = canvas.width - 40
  }

  // if (redX > canvas.width - 32) {
  //   redX = 0;
  // }
  // if (redX < 0) {
  //   redX = canvas.width - 32
  // }
  // if (redY < 0) {
  //   redY = canvas.height - 32
  // }
  // if (redY > canvas.height - 32) {
  //   redY = 0
  // }

  // Check if player and fly collided. Our images
  // are about 32 pixels big.
  if (
    redX <= (fly1X + 32)
    && fly1X <= (redX + 32)
    && redY <= (fly1Y + 32)
    && fly1Y <= (redY + 32)
  ) {
    fly1X = Math.random() * canvas.width;
    fly1Y = -50;
    score++
  }

  else if (
    redX <= (fly2X + 32)
    && fly2X <= (redX + 32)
    && redY <= (fly2Y + 32)
    && fly2Y <= (redY + 32)
  ) {
    fly2X = Math.random() * canvas.width;
    fly2Y = -50;
    score++
  }

  else if (
    redX <= (fly3X + 32)
    && fly3X <= (redX + 32)
    && redY <= (fly3Y + 32)
    && fly3Y <= (redY + 32)
  ) {
    fly3X = Math.random() * canvas.width;
    fly3Y = -50;
    score++
  }

  else if (
    redX <= (wolfX + 32)
    && wolfX <= (redX + 32)
    && redY <= (wolfY + 32)
    && wolfY <= (redY + 100)
  ) {
    finished = true;
    clearInterval(counter);
    count = 0;
    // hide red and wolf
    redReady = false;
    fly1Ready = false;
    fly2Ready = false;
    fly3Ready = false;
    wolfReady = false;
    redX = -600;
    redY = -600;
    //gameoverSound.play();
  }

  if (score > highScore) {
    highScore = score
    localStorage.setItem("userHighScore", highScore);
  }
}
// Pick a new location for the fly.
// Note: Change this to place the fly at a new, random location.
// {
//   flyX = flyX + 50;
//   flyY = flyY + 70;
// }

/**
 * This function, render, runs as often as possible.
 */
var render = function () {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }
  if (redReady) {
    ctx.drawImage(redImage, redX, redY);
  }
  if (fly1Ready) {
    ctx.drawImage(fly1Image, fly1X, fly1Y);
  }
  if (fly2Ready) {
    ctx.drawImage(fly2Image, fly2X, fly2Y);
  }
  if (fly3Ready) {
    ctx.drawImage(fly3Image, fly3X, fly3Y);
  }
  if (wolfReady) {
    ctx.drawImage(wolfImage, wolfX, wolfY);
  }

  document.getElementById("scoreArea").innerHTML = `Score: ${score}`
  document.getElementById("timeArea").innerHTML = `Seconds Remaining: ${count}`
  document.getElementById("highScoreArea").innerHTML = `High Score: ${highScore}`

  if (finished == true) {
    ctx.font = "70px cursive";
    ctx.fillText(`Game Over`, canvas.width / 2, canvas.height / 2);
  }
  // ctx.fillText(`Seconds Remaining: ${SECONDS_PER_ROUND - elapsedTime}`, 20, 100);
  // ctx.fillText(`score:${score}`, 20, 150);
};

/**
 * The main game loop. Most every game will have two distinct parts:
 * update (updates the state of the game, in this case our red and fly)
 * render (based on the state of our game, draw the right things)
 */
var main = function () {
  update();
  render();
  // Request to do this again ASAP. This is a special method
  // for web browsers. 
  requestAnimationFrame(main);
};

// let main = function () {
//   if (count>0) {
//     update(); 
//     render();
//     requestAnimationFrame(main);
//   } else if (count==0) {
//     if (!(currentUser in userHistory)) {
//       userHistory[currentUser] = score;    
//     } else {
//       userHistory[currentUser] = Math.max(score, userHistory[currentUser]);
//     }
//     updateScore();
//     document.getElementById("best-score").innerHTML = `${bestScore}`;
//     let status = "Game Over!";
//     ctx.textBaseline = "middle"; 
//     ctx.font = "30px monospace";
//     ctx.fillStyle = "#00FF41";
//     ctx.textAlign = "center";
//     ctx.fillText(status, 300, 300)
//     document.getElementById("reset").style.visibility = 'visible';
//     localStorage.setItem("userHistory", JSON.stringify(userHistory));
//   }
//   // Request to do this again ASAP. This is a special method
//   // for web browsers. 
// };




// Cross-browser support for requestAnimationFrame.
// Safely ignore this line. It's mostly here for people with old web browsers.
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
loadImages();
setupKeyboardListeners();
main();

function reset() {
  // console.log('---- Reset Game ----')

  count = 30;
  score = 0;
  document.getElementById("start").style.visibility = 'hidden';
  finished = false;
  redReady = true;
  fly1Ready = true;
  fly2Ready = true;
  fly3Ready = true;
  wolfReady = true;

  // reset red position
  redX = canvas.width / 2;
  redY = 420;
  console.log('fly1Y-before-reset:', fly1Y)

  // reset fly1 position
  fly1X = Math.floor(Math.random() * (canvas.width - 80));
  fly1Y = -20;
  console.log('fly1Y-after-reset:', fly1Y)

  // reset fly2 position
  fly2X = Math.floor(Math.random() * (canvas.width - 80));
  fly2Y = -140;

  // reset fly3 position
  fly3X = Math.floor(Math.random() * (canvas.width - 80));
  fly3Y = -250;

  // reset wolf position
  wolfX = Math.floor(Math.random() * (canvas.width - 40));
  wolfY = -370;
  // loadImages();
}