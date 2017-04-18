private var damage : float = 0.5;

private var animDuration : float = 0.5;
private var animStartTime : float = 0;
private var startPos : Vector3;
private var endPos : Vector3;

public var target : GameObject;
	
function Start() {
	animStartTime = Time.time;
	startPos = gameObject.transform.position;
	endPos = target.gameObject.transform.position;
}

function Update() {
	var percent = (Time.time - animStartTime)/animDuration;
	transform.position = Vector3.Lerp(startPos, endPos, percent);

	if (transform.position == endPos && target != null) {
		if (GameObject.FindGameObjectWithTag("H2EShield")) {
			(target.GetComponent("playerController") as playerController).playerHealth -= damage;
			(target.GetComponent("playerController") as playerController).playerEnergy += damage;
			(GameObject.FindGameObjectWithTag("gameMaster").GetComponent("combatGUI") as combatGUI).enemyDamageTaken += damage;
		}
		else if (GameObject.FindGameObjectWithTag("E2HShield")) {
				(target.GetComponent("playerController") as playerController).playerHealth += damage;
				(target.GetComponent("playerController") as playerController).playerEnergy -= damage;
				(GameObject.FindGameObjectWithTag("gameMaster").GetComponent("combatGUI") as combatGUI).enemyDamageTaken += damage; 
			}
			else (target.GetComponent("playerController") as playerController).playerHealth -= damage;
	
	Destroy(gameObject);
	}
	else if (target == null) Destroy(gameObject);
}