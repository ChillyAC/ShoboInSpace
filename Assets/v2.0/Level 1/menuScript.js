var btnFunction : String;

function Start() {
	GetComponent.<Renderer>().material.color = Color.white;
}

function OnMouseDown() {
	GetComponent.<Renderer>().material.color = Color.green;
}

function OnMouseUp() {
	// Add pause function
	GetComponent.<Renderer>().material.color = Color.white;
	if (btnFunction == "menu") {
		Destroy(GameObject.FindGameObjectWithTag("score"));
		Application.LoadLevel("mainMenu");
	}
}