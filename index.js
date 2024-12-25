const gameContainer = document.getElementById("gameContainer");
const canvas = document.createElement("canvas");
const reset = document.createElement("button");
let stopBall = 1;
canvas.id = "gameBoard";
canvas.width = "1000";
canvas.height = "500";

gameContainer.appendChild(canvas);

const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "black";
const ballRadius = 12.5;
let intervalID;
let ballSpeed;
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballXDirection = 0;
let ballYDirection = 0;
let player1Score = 0;
let player2Score = 0;
let paddleMargin = 10;
let paddle1 = {
  width: 10,
  height: 100,
  x: paddleMargin,
  y: gameHeight / 2 - 50,
};
let paddle2 = {
  width: 10,
  height: 100,
  x: gameWidth - paddleMargin - 10,
  y: gameHeight / 2 - 50,
};

function clearBoard() {
  ctx.fillStyle = boardBackground;
  ctx.fillRect(0, 0, gameWidth, gameHeight);
}
gameStart();
function drawBlackHole(x, y) {
  ctx.beginPath();
  ctx.ellipse(x, y, 30, 150, 0, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fillStyle = "orange";
  ctx.fill();
}
function gameStart() {
  createBall();
  nextTick();
}

function nextTick() {
  intervalID = setTimeout(() => {
    clearBoard();
    drawBlackHole(0, gameHeight / 2);
    drawBlackHole(gameWidth, gameHeight / 2);
    drawPaddles();
    moveBall();
    drawBall(ballX, ballY);
    checkCollision();
    nextTick();
  }, 10);
}

function clearBoard() {
  ctx.fillStyle = boardBackground;
  ctx.fillRect(0, 0, gameWidth, gameHeight);
}

function drawPaddles() {
  ctx.fillStyle = "blue";
  ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);

  ctx.fillStyle = "yellow";
  ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
}
function createBall() {
  ballSpeed = 6;
  if (Math.round(Math.random()) == 1) {
    ballXDirection = 1;
  } else {
    ballXDirection = -1;
  }
  if (Math.round(Math.random()) == 1) {
    ballYDirection = Math.random() * 1;
  } else {
    ballYDirection = Math.random() * -1;
  }
  ballX = gameWidth / 2;
  ballY = gameHeight / 2;
  drawBall(ballX, ballY);
}

function drawBall(ballX, ballY) {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
  ctx.fillStyle = "#00ffff";
  ctx.fill();
}

function moveBall() {
  ballX += ballSpeed * ballXDirection;
  ballY += ballSpeed * ballYDirection;
}

function checkCollision() {
  if (ballY <= 0 + ballRadius) {
    ballYDirection *= -1;
  } else if (ballY >= gameHeight - ballRadius) {
    ballYDirection *= -1;
  }
  if (ballX <= 0) {
    ballXDirection *= -1;
  }
  if (ballX >= gameWidth) {
    ballXDirection *= -1;
  }
}

function checkCollision() {
  if (ballY <= 0 + ballRadius) {
    ballYDirection *= -1;
  } else if (ballY >= gameHeight - ballRadius) {
    ballYDirection *= -1;
  }
//   if (ballX <= 0) {
//     ballXDirection *= -1;
//   }
//   if (ballX >= gameWidth) {
//     ballXDirection *= -1;
//   }
  if (ballX <= paddle1.x + paddle1.width + ballRadius) {
    if (ballY > paddle1.y && ballY < paddle1.y + paddle1.height) {
      ballX = paddle1.x + paddle1.width + ballRadius;
      ballXDirection *= -1;
    }
  }
  if (ballX >= paddle2.x - ballRadius) {
    if (ballY > paddle2.y && ballY < paddle2.y + paddle2.height) {
      ballX = paddle2.x - ballRadius;
      ballXDirection *= -1;
    }
  }
}

let paddleSpeed = 8;
let paddle1SpeedY = 0;
let paddle2SpeedY = 0;

function changeDirection(event) {
  const keyPressed = event.keyCode;
  const paddle1Up = 87; //w
  const paddle1Down = 83; //s
  const paddle2Up = 38;
  const paddle2Down = 40;

  switch (keyPressed) {
    case paddle1Up:
      paddle1SpeedY = -paddleSpeed * stopBall;
      break;
    case paddle1Down:
      paddle1SpeedY = paddleSpeed * stopBall;
      break;
    case paddle2Up:
      paddle2SpeedY = -paddleSpeed * stopBall;
      break;
    case paddle2Down:
      paddle2SpeedY = paddleSpeed * stopBall;
      break;
  }
}

function stopPaddleMovement(event) {
  const keyPressed = event.keyCode;
  const paddle1Up = 87; //w
  const paddle1Down = 83; //s
  const paddle2Up = 38; //^
  const paddle2Down = 40; //v

  switch (keyPressed) {
    case paddle1Up:
    case paddle1Down:
      paddle1SpeedY = 0;
      break;
    case paddle2Up:
    case paddle2Down:
      paddle2SpeedY = 0;
      break;
  }
}
function updatePaddlePosition() {
  if (
    paddle1.y + paddle1SpeedY >= 0 &&
    paddle1.y + paddle1SpeedY <= gameHeight - paddle1.height
  ) {
    paddle1.y += paddle1SpeedY;
  }
  if (
    paddle2.y + paddle2SpeedY >= 0 &&
    paddle2.y + paddle2SpeedY <= gameHeight - paddle2.height
  ) {
    paddle2.y += paddle2SpeedY;
  }

  requestAnimationFrame(updatePaddlePosition);
}

document.addEventListener("keydown", changeDirection);
document.addEventListener("keyup", stopPaddleMovement);

requestAnimationFrame(updatePaddlePosition);
