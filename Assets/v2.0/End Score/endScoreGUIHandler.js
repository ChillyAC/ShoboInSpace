var btnFunction : String;

function Start() {
	GetComponent.<Renderer>().material.color = Color.white;
}

function OnMouseDown() {
	GetComponent.<Renderer>().material.color = Color.red;
}

function OnMouseUp() {
	GetComponent.<Renderer>().material.color = Color.white;
	if (btnFunction == "mainMenu") {
		Destroy(GameObject.FindGameObjectWithTag("score"));
		Application.LoadLevel("mainMenu");
	}
	else if (btnFunction == "gameLevel1") {
		Destroy(GameObject.FindGameObjectWithTag("score"));
		Application.LoadLevel("gameLevel1");
	}
}