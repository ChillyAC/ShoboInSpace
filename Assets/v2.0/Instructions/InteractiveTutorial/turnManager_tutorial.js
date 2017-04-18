public var playersTurn : boolean = true;

private var player : GameObject;
private var enemy = new Array();

function Start () {
	playersTurn = true;
	player = GameObject.FindGameObjectWithTag("player");

	manageTurns();
}

function Update () {
	enemy = GameObject.FindGameObjectsWithTag("enemy");
}

function manageTurns() : IEnumerator {
	while (true) {
		if (playersTurn == true) yield StartCoroutine(playerTurn());
			else if (playersTurn == false) yield StartCoroutine(enemyTurn());
	}
}

function playerTurn() : IEnumerator {
	if (playersTurn)
		for (var tempEnemy : GameObject in enemy)
			(tempEnemy.GetComponent("enemyController") as enemyController).enemyShieldPulse();
			
	while (playersTurn) {
		if (GameObject.FindGameObjectWithTag("H2EShield")) Destroy(GameObject.FindGameObjectWithTag("H2EShield"));
		if (GameObject.FindGameObjectWithTag("E2HShield")) Destroy(GameObject.FindGameObjectWithTag("E2HShield"));

		if ((player.GetComponent("playerController") as playerController).playerTurns == 0) playersTurn = false;
		yield;
	}
}

function enemyTurn() : IEnumerator {
	if (!playersTurn) {
		yield WaitForSeconds(3);
			
		for (var tempEnemy : GameObject in enemy) {
			var skill = Random.Range(1,11);
			if (skill > 5) (tempEnemy.GetComponent("enemyController") as enemyController).enemyAttack(player);
				else if (skill < 6) (tempEnemy.GetComponent("enemyController") as enemyController).laserAttack(player);

			yield WaitForSeconds(2);
		}
		
		yield WaitForSeconds(5);
		
		player.GetComponent(AudioSource).clip = (player.GetComponent("playerController") as playerController).audio8;
		player.GetComponent(AudioSource).Play();
		playersTurn = true;
		(player.GetComponent("playerController") as playerController).playerTurns = 1;
	}
}