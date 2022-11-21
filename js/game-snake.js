const canvas = document.getElementById("game-snake");
const ctx = canvas.getContext("2d");

const snakeGround = new Image();
snakeGround.src = "img/snake-ground.jpg";

const win = new Image();
win.src = "img/win.jpg";

const foodCss = new Image();
foodCss.src = "img/food/css.png";

const foodGit = new Image();
foodGit.src = "img/food/git.png";

const foodHtml = new Image();
foodHtml.src = "img/food/html.png";

const foodJs = new Image();
foodJs.src = "img/food/js.png";

const foodNode = new Image();
foodNode.src = "img/food/node-js.png";

const foodReact = new Image();
foodReact.src = "img/food/react.png";

const foodSass = new Image();
foodSass.src = "img/food/sass.png";

const header = new Image();
header.src = "img/chrome.png";

const CELL_SIZE = 32;
const CELL_COUNT = 19;

const pictures = [
  foodSass,
  foodReact,
  foodNode,
  foodJs,
  foodHtml,
  foodGit,
  foodCss,
];

const snake = [];
snake[0] = {
  x: 9 * CELL_SIZE,
  y: 9 * CELL_SIZE,
};

let score = 0;
let random = pictures[Math.floor(Math.random() * pictures.length)];
let food = getRandomCell();
let dir;
let isLose = false;

document.addEventListener("keydown", direction);

function getRandomCell() {
  const cell = {
    x: Math.floor(Math.random() * CELL_COUNT) * CELL_SIZE,
    y: Math.floor(Math.random() * CELL_COUNT) * CELL_SIZE,
  };

  for (let i = 1; i < snake.length; i++) {
    if (cell.x === snake[i].x && cell.y === snake[i].y) {
      return getRandomCell();
    }
  }

  return cell;
}

function direction(event) {
  if (
    (event.keyCode === 37 && dir !== "right") ||
    (event.keyCode === 65 && dir !== "right")
  ) {
    dir = "left";
  }
  if (
    (event.keyCode === 38 && dir !== "down") ||
    (event.keyCode === 87 && dir !== "down")
  ) {
    dir = "up";
  }
  if (
    (event.keyCode === 39 && dir !== "left") ||
    (event.keyCode === 68 && dir !== "left")
  ) {
    dir = "right";
  }
  if (
    (event.keyCode === 40 && dir !== "up") ||
    (event.keyCode === 83 && dir !== "up")
  ) {
    dir = "down";
  }
}

function gameOver() {
  isLose = true;
  clearInterval(game);
  drawGame(true);
}

function checkGameOver(snake) {
  const head = snake[0];

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }

  return (
    head.x < CELL_SIZE ||
    head.x > CELL_SIZE * (CELL_COUNT - 2) ||
    head.y < CELL_SIZE ||
    head.y > CELL_SIZE * (CELL_COUNT - 2)
  );
}

function drawSnake(isLose) {
  for (let s = 0; s < snake.length; s++) {
    if (s === 0) {
      ctx.drawImage(header, snake[s].x, snake[s].y, CELL_SIZE, CELL_SIZE);
    } else {
      ctx.fillStyle = isLose ? "red" : "green";
      ctx.fillRect(snake[s].x, snake[s].y, CELL_SIZE, CELL_SIZE);
    }
  }
}

function drawGame() {
  ctx.drawImage(snakeGround, 0, 0);
  ctx.drawImage(random, food.x, food.y);

  drawSnake(isLose);

  if (isLose) {
    ctx.globalAlpha = 0.4;
    console.log(CELL_SIZE * CELL_COUNT);
    ctx.drawImage(win, 0, 0, CELL_SIZE * CELL_COUNT, CELL_SIZE * CELL_COUNT);
    ctx.globalAlpha = 1;
  }

  ctx.fillStyle = "rgba(255,255,255,0.2)";
  ctx.font = "50px Arial";
  ctx.fillText(score, CELL_SIZE * 2, CELL_SIZE * 1.3);
}

function move() {
  let headX = snake[0].x;
  let headY = snake[0].y;

  if (checkGameOver(snake)) {
    return gameOver();
  }

  if (headX === food.x && headY === food.y) {
    score++;
    random = pictures[Math.floor(Math.random() * pictures.length)];
    food = getRandomCell();
  } else {
    snake.pop();
  }

  if (dir === "left") headX -= CELL_SIZE;
  if (dir === "right") headX += CELL_SIZE;
  if (dir === "up") headY -= CELL_SIZE;
  if (dir === "down") headY += CELL_SIZE;

  const newHead = {
    x: headX,
    y: headY,
  };
  snake.unshift(newHead);
}

let game = setInterval(() => {
  move();
  drawGame();
}, 200);
