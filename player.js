var playerPosition = {x: 100, y: 100}; // プレイヤーの初期位置

function movePlayer(dx, dy) {
  playerPosition.x += dx;
  playerPosition.y += dy;
  document.getElementById("player").style.left = playerPosition.x + "px";
  document.getElementById("player").style.top = playerPosition.y + "px";
}

// 上に移動する例
movePlayer(0, -10);
