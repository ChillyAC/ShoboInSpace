public var playerTurns : int = 1;
public var playerHealth : float = 10;
public var playerEnergy : float = 10;

private var temp : GameObject;
private var missile : GameObject;
private var playerLaser : GameObject;
private var H2EShield : GameObject;
private var E2HShield : GameObject;
//private var scText : GameObject;
//public var coolFont : Font;

private var ebombEnergy : float = 2;
private var laserEnergy : float = 0.5;

private var enemyArray = new Array();

public var audio2 : AudioClip;
public var audio5 : AudioClip;
public var audio8 : AudioClip;
public var audio9 : AudioClip;
public var audioManager : AudioSource;

function Start () {
	missile = Resources.Load("missile");
	playerLaser = Resources.Load("playerLaser");
	H2EShield = Resources.Load("H2EShield");
	E2HShield = Resources.Load("E2HShield");
	audioManager = GetComponent(AudioSource);
//	scText = Resources.Load("scText");
}

function Update () {
	if (playerHealth <= 0) {
		(GameObject.FindGameObjectWithTag("score").GetComponent("scoreHandler") as scoreHandler).score = (GameObject.FindGameObjectWithTag("gameMaster").GetComponent("combatGUI") as combatGUI).enemyDamageTaken;
		Application.LoadLevel("endScore");
	}
	
	if (playerHealth > 10) playerHealth = 10;
	if (playerHealth < 0) playerHealth = 0;
	if (playerEnergy > 10) playerEnergy = 10;
	if (playerEnergy < 0) playerEnergy = 0;
	
	if (playerHealth <= 2 && GameObject.FindGameObjectWithTag("H2EShield") != null) Destroy(GameObject.FindGameObjectWithTag("H2EShield"));
	if (playerEnergy <= 1 && GameObject.FindGameObjectWithTag("E2HShield") != null) Destroy(GameObject.FindGameObjectWithTag("E2HShield"));
	
	enemyArray = GameObject.FindGameObjectsWithTag("enemy");
}

function ebombAttack () {
	if (playerEnergy >= ebombEnergy) {
		temp = Instantiate (missile, gameObject.transform.position + Vector3(0,0,1), Quaternion.identity);
		(temp.GetComponent("missileScript") as missileScript).target = (enemyArray[0] as GameObject);
		temp.transform.localScale = Vector3(0.5, 0.5, 0.5);
		
		gameObject.transform.position += Vector3(-1, 0, 0);
		
		playerEnergy -= ebombEnergy;
	}
	yield;
}

function laserAttack (target : GameObject) {
	if (playerEnergy >= laserEnergy) {
		temp = Instantiate (playerLaser, gameObject.transform.position + Vector3(0,0,1), Quaternion.identity * Quaternion.Euler(-270,0,180));
		(temp.GetComponent("playerLaserScript") as playerLaserScript).target = target;
		temp.transform.localScale = Vector3(0.05, 1, 0.03);
					
		gameObject.transform.position += Vector3(-0.2, 0, 0);
		
		playerEnergy -= laserEnergy;
	}
	yield;
}

function health2energy () {
	if (playerHealth > 2) {
		if (GameObject.FindGameObjectWithTag("H2EShield")) Destroy(GameObject.FindGameObjectWithTag("H2EShield"));
		if (GameObject.FindGameObjectWithTag("E2HShield")) Destroy(GameObject.FindGameObjectWithTag("E2HShield"));
		temp = Instantiate(H2EShield, gameObject.transform.position + Vector3(0,0,-1), Quaternion.identity * Quaternion.Euler(-90,0,0));
		temp.transform.localScale = Vector3(0.25,1,0.25);
	}
}

function energy2health () {
	if (playerEnergy > 1) {
		if (GameObject.FindGameObjectWithTag("H2EShield")) Destroy(GameObject.FindGameObjectWithTag("H2EShield"));
		if (GameObject.FindGameObjectWithTag("E2HShield")) Destroy(GameObject.FindGameObjectWithTag("E2HShield"));
		temp = Instantiate(E2HShield, gameObject.transform.position + Vector3(0,0,-1), Quaternion.identity * Quaternion.Euler(-90,0,0));
		temp.transform.localScale = Vector3(0.25,1,0.25);
	}
}

function restoration () {
	audioManager.clip = audio9;
	audioManager.Play();
		
	gameObject.GetComponent.<ParticleSystem>().Play();
	if (playerHealth < 9) playerHealth += 2;
	if (playerEnergy < 9) playerEnergy += 2;
}

function endTurn() {
	audioManager.clip = audio2;
	audioManager.Play();
		
	playerTurns = 0;
}

//function scTextNote(text : String, x : float) {
//	var gui : Transform = Instantiate(scText.transform, Vector3(x,0.9,0), Quaternion.identity);
//	gui.guiText.text = text;
//	gui.guiText.font = coolFont;
//	gui.guiText.fontSize = 0.04 * Screen.width;
//}