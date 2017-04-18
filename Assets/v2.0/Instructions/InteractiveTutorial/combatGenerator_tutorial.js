private var player : GameObject;
private var enemy : GameObject;
private var explosion : GameObject;

private var player1 : GameObject;
private var enemy1 = new Array();
private var deadEnemy : GameObject;

public var waveCount : int = 0;
public var oldestWave : int = 0;

function Start () {
	player = Resources.Load("player");
	enemy = Resources.Load("enemy");
	explosion = Resources.Load("explosion");
	
	generatePlayer();
	player1 = GameObject.FindGameObjectWithTag("player");
	generateEnemy();
	enemy1 = GameObject.FindGameObjectsWithTag("enemy");
}

function Update () {
	player1 = GameObject.FindGameObjectWithTag("player");
	enemy1 = GameObject.FindGameObjectsWithTag("enemy");
	
	if (enemy1 != null && waveCount > 0) minWaveID();
	
	if (player1.transform.position.x != -6.5)
		player1.transform.position = Vector3.MoveTowards(player1.transform.position, Vector3(-6.5, player1.transform.position.y, 0), Time.deltaTime);
	
	if (enemy1 != null) {
		for (var temp : GameObject in enemy1) {
			if ((temp.gameObject.GetComponent("enemyController") as enemyController).waveID == oldestWave) temp.gameObject.transform.position = Vector3.MoveTowards(temp.gameObject.transform.position, Vector3(3.5, temp.gameObject.transform.position.y, 0), 3 * Time.deltaTime);
				else temp.gameObject.transform.position = Vector3.MoveTowards(temp.gameObject.transform.position, Vector3(3.5 + ((temp.gameObject.GetComponent("enemyController") as enemyController).waveID - oldestWave) * 2, temp.gameObject.transform.position.y, 0), 3 * Time.deltaTime);
						
			if ((temp.gameObject.GetComponent("enemyController") as enemyController).enemyHealth <= 0) {
				Instantiate(explosion, temp.gameObject.transform.position + Vector3(0,0,-1), Quaternion.identity * Quaternion.Euler(-90,0,0));
				deadEnemy = temp;
				deadEnemy.GetComponent.<Renderer>().enabled = false;
				deadEnemy.gameObject.tag = "Untagged";
				
				(GetComponent("combatGUI_tutorial") as combatGUI_tutorial).enemyDamageTaken += 10;
				(player1.GetComponent("playerController") as playerController).restoration();
			}
		}
	}
	if ((GetComponent("combatGUI_tutorial") as combatGUI_tutorial).enabled && !(GetComponent("combatGUI_tutorial") as combatGUI_tutorial).gameOverBool) {
		if (enemy1.length < 1) generateEnemy();
		if ((GetComponent("combatGUI_tutorial") as combatGUI_tutorial).waveStart + (GetComponent("combatGUI_tutorial") as combatGUI_tutorial).waveTimer - Time.time <= 0.01) generateEnemy();
	}
}

function minWaveID () {
	oldestWave = waveCount;
	for (var temp1 : GameObject in enemy1)
		if ((temp1.GetComponent("enemyController") as enemyController).waveID < oldestWave) oldestWave = (temp1.GetComponent("enemyController") as enemyController).waveID;
}

function generatePlayer() {
	var temp : GameObject;
	temp = Instantiate(player, Vector3(-9, 0, 0), Quaternion.identity * Quaternion.Euler(-90, 0, 0));
	temp.gameObject.transform.localScale = Vector3(30, 30, 30);
	
	(GetComponent("turnManager_tutorial") as turnManager_tutorial).enabled = true;
	yield WaitForSeconds(2.5);
	(GetComponent("combatGUI_tutorial") as combatGUI_tutorial).enabled = true;
}

function generateEnemy() {
	player1.GetComponent(AudioSource).clip = (player1.GetComponent("playerController") as playerController).audio5;
	player1.GetComponent(AudioSource).Play();
	
	var temp : GameObject;
	waveCount++;
	for (var i=0; i<2; i++) {
		temp = Instantiate(enemy, Vector3(11, -1+i*2, 0), Quaternion.identity * Quaternion.Euler(0, -110, 90));
		temp.gameObject.transform.localScale = Vector3(20, 20, 20);
		(temp.gameObject.GetComponent("enemyController") as enemyController).waveID = waveCount;
	}
	(GetComponent("combatGUI_tutorial") as combatGUI_tutorial).waveStart = Time.time;
	(GetComponent("combatGUI_tutorial") as combatGUI_tutorial).waveTimer = 60;
}