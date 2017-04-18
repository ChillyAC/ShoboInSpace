private var uvAnimationTileX = 17;	//Here you can place the number of columns of your sheet. 
private var uvAnimationTileY = 1;	//Here you can place the number of rows of your sheet. 
private var framesPerSecond = 17;
private var startTime : float;
private var index : int = 0;

function Start() {
//	renderer.material.color.a = 0;
	startTime = Time.time;
	selfDestroy();
}
 
function Update () {
//	renderer.material.color.a = 1;
	index = (Time.time - startTime) * framesPerSecond;
	
	// Size of every tile
	var size = Vector2 (1.0 / uvAnimationTileX, 1.0 / uvAnimationTileY);
 
	// Split into horizontal and vertical index
	var uIndex = index % uvAnimationTileX;
	var vIndex = index / uvAnimationTileY;
 
	// Build offset
	var offset = Vector2 (uIndex * size.x, 1.0 - size.y - vIndex * size.y);
 
	GetComponent.<Renderer>().material.SetTextureOffset ("_MainTex", offset);
	GetComponent.<Renderer>().material.SetTextureScale ("_MainTex", size);
}

function selfDestroy() {
	Destroy(gameObject, 1);
}