private var pos1 : Vector3;
private var pos2 : Vector3;
private var pos3 : Vector3;
private var pos4 : Vector3;

private var missile : GameObject;
private var enemyArray = new Array();

function Start () {
	missile = Resources.Load("missile");
	pos1 = Vector3(0, 5, 1);
	pos2 = Vector3(0, -5, 1);
	pos3 = Vector3(6.5, 5, 1);
	pos4 = Vector3(6.5, -5, 1);
	
	enemyArray = GameObject.FindGameObjectsWithTag("enemy");
	rescue();
}

function Update () {
	enemyArray = GameObject.FindGameObjectsWithTag("enemy");
}

function rescue () {
	var temp : GameObject;
	
	temp = Instantiate (missile, pos1, Quaternion.identity);
	(temp.GetComponent("missileScript") as missileScript).target = (enemyArray[0] as GameObject);
	temp.transform.localScale = Vector3(0.5, 0.5, 0.5);
	
	yield WaitForSeconds(0.5);
	
	temp = Instantiate (missile, pos2, Quaternion.identity);
	(temp.GetComponent("missileScript") as missileScript).target = (enemyArray[0] as GameObject);
	temp.transform.localScale = Vector3(0.5, 0.5, 0.5);
	
	yield WaitForSeconds(0.5);

	temp = Instantiate (missile, pos3, Quaternion.identity);
	(temp.GetComponent("missileScript") as missileScript).target = (enemyArray[0] as GameObject);
	temp.transform.localScale = Vector3(0.5, 0.5, 0.5);
	
	yield WaitForSeconds(0.5);
	
	temp = Instantiate (missile, pos4, Quaternion.identity);
	(temp.GetComponent("missileScript") as missileScript).target = (enemyArray[0] as GameObject);
	temp.transform.localScale = Vector3(0.5, 0.5, 0.5);

	yield WaitForSeconds(2.5);
	
	(GameObject.FindGameObjectWithTag("score").GetComponent("scoreHandler") as scoreHandler).score = (GameObject.FindGameObjectWithTag("gameMaster").GetComponent("combatGUI") as combatGUI).enemyDamageTaken;
	Application.LoadLevel("endScore");
}