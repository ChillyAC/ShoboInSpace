var btnFunction : String;

function Start() {
	GetComponent.<Renderer>().material.color = Color.white;
}

function Update () {
	if ((GameObject.FindGameObjectWithTag("gameMaster").GetComponent("tutorialHandler") as tutorialHandler).nextBtnBool) GameObject.Find("tutorial_next_btn").GetComponent.<Renderer>().enabled = true;
	else GameObject.Find("tutorial_next_btn").GetComponent.<Renderer>().enabled = false;
}

function OnMouseDown() {
	GetComponent.<Renderer>().material.color = Color.green;
}

function OnMouseUp() {
	GetComponent.<Renderer>().material.color = Color.white;
	if (btnFunction == "quit") {
		Application.Quit();
	}
	else if (btnFunction == "tutorial") {
		Application.LoadLevel("tutorialLevel_test");
	}
	else if (btnFunction == "gameLevel1") {
		Application.LoadLevel("gameLevel1");
	}
	else if (btnFunction == "nextBtn") {
		(GameObject.FindGameObjectWithTag("gameMaster").GetComponent("tutorialHandler") as tutorialHandler).nextButton();
	}
}