private var animStartTime : float = 0;
private var startPos : Vector3 = Vector3.zero;
public var endPos : Vector3 = Vector3.zero;
public var activeBool : boolean = true;

function Start() {
	animStartTime = Time.time;
	startPos = gameObject.transform.position;
//	endPos = target.gameObject.transform.position;
}

function Update() {
	var percent = (Time.time - animStartTime); //animDuration=1
	if (endPos != Vector3.zero) transform.position = Vector3.Lerp(startPos, endPos, percent);
	if (activeBool == false && endPos == Vector3.zero) Destroy(gameObject);
	if (transform.position == endPos) Destroy(gameObject);
}