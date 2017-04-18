function setText (text : String, size : int) {
	(gameObject.GetComponent("TextMesh") as TextMesh).text = text;
	(gameObject.GetComponent("TextMesh") as TextMesh).fontSize = size;
}