public var enemyRef : GameObject;

function Start () {

}

function Update () {
	if (enemyRef != null) transform.position = enemyRef.transform.position;
	transform.Rotate(Vector3(Time.deltaTime + 30, 0, 0), Space.Self);
}