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
	document.getElementById("
