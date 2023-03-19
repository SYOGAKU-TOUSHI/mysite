const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const playerWidth = 20;
const playerHeight = 20;
const playerSpeed = 5;
let playerX = (canvas.width - playerWidth) / 2;
let playerY = canvas.height - playerHeight - 10;

const bulletWidth = 5;
const bulletHeight = 10;
const bullets = [];

let keyState = {};

document.addEventListener("keydown", (event) => {
  keyState[event.key] = true;
});

document.addEventListener("keyup", (event) => {
  keyState[event.key] = false;
});

function drawPlayer() {
  ctx.beginPath();
  ctx.rect(playerX, playerY, playerWidth, playerHeight);
  ctx.fillStyle = "#00FF00";
  ctx.fill();
  ctx.closePath();
}

function drawBullet(x, y) {
  ctx.beginPath();
  ctx.rect(x, y, bulletWidth, bulletHeight);
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();
  ctx.closePath();
}

function updateBullets() {
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].y -= 5;
    if (bullets[i].y < 0) {
      bullets.splice(i, 1);
    }
  }
}

function drawBullets() {
  for (const bullet of bullets) {
    drawBullet(bullet.x, bullet.y);
  }
}

function handleInput() {
  if (keyState["ArrowLeft"]) {
    playerX = Math.max(playerX - playerSpeed, 0);
  }
  if (keyState["ArrowRight"]) {
    playerX = Math.min(playerX + playerSpeed, canvas.width - playerWidth);
  }
  if (keyState[" "]) {
    bullets.push({ x: playerX + playerWidth / 2 - bulletWidth / 2, y: playerY });
    keyState[" "] = false;
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleInput();
  drawPlayer();
  updateBullets();
  drawBullets();
  requestAnimationFrame(gameLoop);
}

gameLoop();
