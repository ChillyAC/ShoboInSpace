public var score : int = 0;

function Start () {
	DontDestroyOnLoad(gameObject);
}

function Update () {
	if (Application.loadedLevelName == "endScore") {
		(gameObject.GetComponent("TextMesh") as TextMesh).text = "Your score - " + score;
		gameObject.GetComponent.<Renderer>().enabled = true;
	}
	else gameObject.GetComponent.<Renderer>().enabled = false;
}