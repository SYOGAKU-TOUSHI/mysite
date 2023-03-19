var player = {
	hp: 100,
	attack: 10,
	defense: 5
};

var enemy = {
	hp: 50,
	attack: 8,
	defense: 3
};

function attack() {
	var damageToEnemy = player.attack - enemy.defense;
	var damageToPlayer = enemy.attack - player.defense;
	enemy.hp -= damageToEnemy;
	player.hp -= damageToPlayer;
	updateStats();
	checkGameOver();
}

function updateStats() {
	document.getElementById("player-hp").innerHTML = player.hp;
	document.getElementById("player-attack").innerHTML = player.attack;
	document.getElementById("player-defense").innerHTML = player.defense;
	document.getElementById("enemy-hp").innerHTML = enemy.hp;
	document.getElementById("enemy-attack").innerHTML = enemy.attack;
	document.getElementById("enemy-defense").innerHTML = enemy.defense;
}

function checkGameOver() {
	if (player.hp <= 0) {
		alert("Game over! You lost.");
	}
	else if (enemy.hp <= 0) {
		alert("Congratulations! You won!");
	}
}
