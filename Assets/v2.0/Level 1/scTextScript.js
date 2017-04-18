private var scrollSpeed : float = 0.01;
private var textDuration : float = 2;
private var alpha : float = 1;
private var ptsPrefab : GameObject;

function Start() {
	GetComponent.<GUIText>().material.color = Color(1,1,1,1.0);
	ptsPrefab = Resources.Load("scText");
}
 
function Update() {
	if (alpha > 0) {
		transform.position.y += scrollSpeed*Time.deltaTime;
		alpha -= Time.deltaTime/textDuration;
		GetComponent.<GUIText>().material.color.a = alpha;
	}
	else {
		Destroy(gameObject);
	}
}