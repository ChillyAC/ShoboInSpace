public var enemyHealth : float = 5;
public var waveID : int = 0;

private var temp: GameObject;
private var shieldRef : GameObject;
private var missile : GameObject;
private var enemyLaser : GameObject;
private var shield : GameObject = null;

public var mat1 : Material;
public var mat2 : Material;

function Start () {
	missile = Resources.Load("missile");
	enemyLaser = Resources.Load("enemyLaser");
	shield = Resources.Load("shield");
	enemyHealth = Random.Range(3, 7);
	StartCoroutine("enemyShieldPulse");
}

function Update () {
	if (enemyHealth < 0.15) enemyHealth = 0;
	if (gameObject.tag == "Untagged") {
		StopCoroutine("enemyShieldPulse");
		if (shieldRef) (shieldRef.GetComponent("enemyShieldScript") as enemyShieldScript).enemyRef = null;
		Destroy(shieldRef);
		shieldRef = null;
		Destroy(gameObject);
	}
}

function enemyAttack (target : GameObject) {
	temp = Instantiate (missile, transform.position + Vector3(0,0,1), Quaternion.identity);
	(temp.GetComponent("missileScript") as missileScript).target = target;
	temp.transform.localScale = Vector3(0.3, 0.3, 0.3);
	gameObject.transform.position += Vector3(0.75, 0, 0);
	
	yield;
}

function laserAttack (target : GameObject) {
	var laserCount = 0;
	while (laserCount < 4) {
		temp = Instantiate (enemyLaser, transform.position, Quaternion.identity * Quaternion.Euler(-270,0,180));
		(temp.GetComponent("enemyLaserScript") as enemyLaserScript).target = target;
		temp.transform.localScale = Vector3(0.05, 1, 0.03);
		gameObject.transform.position += Vector3(0.1, 0, 0);
		
		laserCount++;
		yield WaitForSeconds(Random.Range(0.5, 1.1));
	}
	yield;
}

function enemyShieldPulse () : IEnumerator {
	if (shield == null) shield = Resources.Load("shield");
	if (Application.loadedLevelName == "gameLevel1")
		while ((GameObject.FindGameObjectWithTag("gameMaster").GetComponent("turnManager") as turnManager).playersTurn == true) {
	//		shieldRef = Instantiate(shield, gameObject.transform.position + Vector3(0,0,-1), Quaternion.identity * Quaternion.Euler(-90,0,0));
			shieldRef = Instantiate(shield, gameObject.transform.position + Vector3(0.1,0,0), Quaternion.identity);
			GetComponent.<Renderer>().material = mat2;
	//		shieldRef.transform.localScale = Vector3(0.2,1,0.2);
			if (shieldRef != null) (shieldRef.GetComponent("enemyShieldScript") as enemyShieldScript).enemyRef = gameObject;
			yield WaitForSeconds(Random.Range(0.5, 1.6));
			Destroy(shieldRef);
			GetComponent.<Renderer>().material = mat1;
			yield WaitForSeconds(Random.Range(0.5, 1.6));
		}
	else while ((GameObject.FindGameObjectWithTag("gameMaster").GetComponent("turnManager_tutorial") as turnManager_tutorial).playersTurn == true) {
	//		shieldRef = Instantiate(shield, gameObject.transform.position + Vector3(0,0,-1), Quaternion.identity * Quaternion.Euler(-90,0,0));
			shieldRef = Instantiate(shield, gameObject.transform.position + Vector3(0.1,0,0), Quaternion.identity);
			GetComponent.<Renderer>().material = mat2;
	//		shieldRef.transform.localScale = Vector3(0.2,1,0.2);
			if (shieldRef != null) (shieldRef.GetComponent("enemyShieldScript") as enemyShieldScript).enemyRef = gameObject;
			yield WaitForSeconds(Random.Range(0.5, 1.6));
			Destroy(shieldRef);
			GetComponent.<Renderer>().material = mat1;
			yield WaitForSeconds(Random.Range(0.5, 1.6));
		}
}