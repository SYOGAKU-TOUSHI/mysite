// キーボードイベントの追加
document.addEventListener("keydown", function(event) {
  switch(event.key) {
    case "ArrowLeft":
      movePlayer(-10, 0); // 左に移動
      break;
    case "ArrowRight":
      movePlayer(10, 0); // 右に移動
      break;
    case "ArrowUp":
      movePlayer(0, -10); // 上に移動
      break;
    case "ArrowDown":
      movePlayer(0, 10); // 下に移動
      break;
  }
});
