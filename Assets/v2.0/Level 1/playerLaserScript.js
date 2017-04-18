private var damage : float = 1;

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
	var percent = (Time.time - animStartTime) / animDuration;
	transform.position = Vector3.Lerp(startPos, endPos, percent);

	if (transform.position == endPos && target != null) {
		(target.GetComponent("enemyController") as enemyController).enemyHealth -= damage;
		(GameObject.FindGameObjectWithTag("gameMaster").GetComponent("combatGUI") as combatGUI).enemyDamageTaken += damage;
		
		Destroy(gameObject);
	}
	else if (target == null) Destroy(gameObject);
}