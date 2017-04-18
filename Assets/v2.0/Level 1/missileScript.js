private var playerDamage : float = 2;
private var enemyDamage : float = 2;
private var explosion : GameObject;

private var animStartTime : float = 0;
private var animDuration : float = 1.5;
private var startPos : Vector3;
private var endPos : Vector3;

private var enemyArray = new Array();

public var target : GameObject;
	
function Start() {
	explosion = Resources.Load("explosion");
	
	animStartTime = Time.time;
	startPos = gameObject.transform.position;
	if (target.GetComponent("playerController") as playerController) endPos = Vector3(-6.5, 0, 1);
		else {
			if ((GameObject.FindGameObjectWithTag("gameMaster").GetComponent("combatGenerator") as combatGenerator).waveCount == (GameObject.FindGameObjectWithTag("gameMaster").GetComponent("combatGenerator") as combatGenerator).oldestWave)
				endPos = Vector3(3.5, 0, 1);
			else endPos = Vector3((((GameObject.FindGameObjectWithTag("gameMaster").GetComponent("combatGenerator") as combatGenerator).waveCount - (GameObject.FindGameObjectWithTag("gameMaster").GetComponent("combatGenerator") as combatGenerator).oldestWave + 1) * 2 + 0.5), 0, 1);
		}
}

function Update() {
	enemyArray = GameObject.FindGameObjectsWithTag("enemy");
	
	var percent = (Time.time - animStartTime) / animDuration;
	transform.position = Vector3.Lerp(startPos, endPos, percent);
	transform.Rotate(Vector3(0, Time.deltaTime + 30, 0), Space.Self);
	transform.localScale += Vector3(0.015, 0.015, 0.015);
	
	if (transform.position == endPos && target != null) {
		if (target.GetComponent("playerController") as playerController) {
			if (GameObject.FindGameObjectWithTag("H2EShield")) {
				(target.GetComponent("playerController") as playerController).playerHealth -= enemyDamage;
				(target.GetComponent("playerController") as playerController).playerEnergy += enemyDamage;
				(GameObject.FindGameObjectWithTag("gameMaster").GetComponent("combatGUI") as combatGUI).enemyDamageTaken += enemyDamage;
			}
			else if (GameObject.FindGameObjectWithTag("E2HShield")) {
					(target.GetComponent("playerController") as playerController).playerHealth += enemyDamage;
					(target.GetComponent("playerController") as playerController).playerEnergy -= enemyDamage;
					(GameObject.FindGameObjectWithTag("gameMaster").GetComponent("combatGUI") as combatGUI).enemyDamageTaken += enemyDamage;
				}
				else (target.GetComponent("playerController") as playerController).playerHealth -= enemyDamage;
			Instantiate(explosion, target.transform.position + Vector3(0,0,-1), Quaternion.identity * Quaternion.Euler(-90,0,0));
		}
		else if (enemyArray.length > 0) {
			for (var tempEnemy : GameObject in enemyArray) {
				(tempEnemy.GetComponent("enemyController") as enemyController).enemyHealth -= playerDamage;
				(GameObject.FindGameObjectWithTag("gameMaster").GetComponent("combatGUI") as combatGUI).enemyDamageTaken += playerDamage;
				
				Instantiate(explosion, tempEnemy.transform.position + Vector3(0,0,-1), Quaternion.identity * Quaternion.Euler(-90,0,0));
			}
		}
		Destroy(gameObject);
	}
	else if (target == null) {
		Instantiate(explosion, gameObject.transform.position + Vector3(0,0,-1), Quaternion.identity * Quaternion.Euler(-90,0,0));
		Destroy(gameObject);
	}
}