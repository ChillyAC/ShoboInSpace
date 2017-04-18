var btnFunction : String;

function Start() {
	if (PlayerPrefs.GetString("tutorial") != "disabled") {
		PlayerPrefs.SetString("tutorial", "enabled");
		PlayerPrefs.Save();
	}
//		else {
//			PlayerPrefs.SetString("tutorial", "disabled");
//			PlayerPrefs.Save();
//		}
	GetComponent.<Renderer>().material.color = Color.white;
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
		if (PlayerPrefs.GetString("tutorial") != "disabled") {
			PlayerPrefs.SetString("tutorial", "disabled");
			PlayerPrefs.Save();
			Application.LoadLevel("tutorialLevel");
		}
		else if (PlayerPrefs.GetString("tutorial") == "disabled") Application.LoadLevel("gameLevel1");
	}
}