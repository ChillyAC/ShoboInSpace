public var instrText : GameObject;
private var highlightTexture : Texture;
private var touchArrow : GameObject;

private var highlightBool1 : boolean = false;
private var highlightBool2 : boolean = false;
private var highlightBool3 : boolean = false;
private var highlightBool4 : boolean = false;

public var nextBtnBool : boolean;
public var phaseID : int;
private var phaseBool : boolean = false;

function Start () {
	highlightTexture = Resources.Load("Textures & images/highlightGUI");
	touchArrow = Resources.Load("touchArrow");
	nextBtnBool = false;
	phaseID = 0;
//	handler();
}

function Update () {
	handler();
}

function handler () {
	var i : int;
	
	// Story text
	if (phaseID == 0 && !phaseBool) {
		phaseBool = true;
		setText(70, Vector3(0, 0, -1), "cpt. shobo was sent\non a mission deep\nbehind enemy lines.\nduring the escape,\nthe ship's engine was damaged.\nshobo managed to contact\nhis allies, so help\nis on the way.\n\ncan he survive until they arrive\nor will he go down fighting?");
		waitForNextButton ();
		yield WaitForSeconds(1);
		phaseBool = false;
	}
	
	// Player turn - turn indicator highlight
	if (phaseID == 1 && !phaseBool) {
		phaseBool = true;
		setText(70, Vector3(0, 0, -1), "the game starts on your turn.");
		yield WaitForSeconds(1.5);
		for (i=0; i<3; i++) {
			highlightBool1 = true;
			yield WaitForSeconds(0.2);
			highlightBool1 = false;
			yield WaitForSeconds(0.2);
		}
		waitForNextButton ();
		yield WaitForSeconds(1);
		phaseBool = false;
	}
	
	// Player turn - attack - enemy highlight
	if (phaseID == 2 && !phaseBool) {
		phaseBool = true;
		setText(70, Vector3(0, 0, -1), "on your turn, you can only\nattack the enemy ships.");
		yield WaitForSeconds(2.6);
		for (i=0; i<3; i++) {
			highlightBool2 = true;
			yield WaitForSeconds(0.2);
			highlightBool2 = false;
			yield WaitForSeconds(0.2);
		}
		waitForNextButton ();
		yield WaitForSeconds(1);
		phaseBool = false;
	}
	
	// Player turn - attack - energy highlight
	if (phaseID == 3 && !phaseBool) {
		phaseBool = true;
		setText(70, Vector3(0, 0, -1), "you can attack by\nshooting lasers\nand launching e-bombs.\nthey both consume\nsome ship energy.");
		yield WaitForSeconds(3);
		for (i=0; i<3; i++) {
			highlightBool3 = true;
			yield WaitForSeconds(0.2);
			highlightBool3 = false;
			yield WaitForSeconds(0.2);
		}
		waitForNextButton ();
		yield WaitForSeconds(1);
		phaseBool = false;
	}
	
	// Player turn - attack types
	if (phaseID == 4 && !phaseBool) {
		phaseBool = true;
		setText(70, Vector3(0, 0, -1), "laser is a cheap,\nlow damage attack.\ne-bomb is an expensive,\nhigh damage attack.");
		waitForNextButton ();
		yield WaitForSeconds(1);
		phaseBool = false;
	}
	
	// Player turn - attack - bomb anim
	if (phaseID == 5 && !phaseBool) {
		phaseBool = true;
		setText(70, Vector3(0, 0, -1), "the e-bomb can be used\nto by-pass the enemy cloak.\nto use an e-bomb,\nswipe from shobo's ship\ntowards the enemy ships.");
		yield WaitForSeconds(3);
		arrowAnimation("down_up");
		waitForNextButton ();
		yield WaitForSeconds(1);
		phaseBool = false;
	}
	
	// phase 6 - player uses bomb
//	yield waitForInput();
	
	// Player turn - attack - laser	anim
	if (phaseID == 7 && !phaseBool) {
		phaseBool = true;
		setText(70, Vector3(0, 0, -1), "the laser can be shot only at\nde-cloaked enemy ships.\nto use the laser,\ntap on a de-cloaked enemy ship.");
		yield WaitForSeconds(3);
		arrowHighlight();
		waitForNextButton ();
		yield WaitForSeconds(1);
		phaseBool = false;
	}
	
	// phase 8 - player uses laser
//	yield waitForInput();
	
	// Player turn - end turn anim
	if (phaseID == 9 && !phaseBool) {
		phaseBool = true;
		setText(70, Vector3(0, 0, -1), "once you are done attacking,\nyou have to end your turn.\nthis is done by swiping\nfrom the enemy ships\ntowards shobo's ship.");
		yield WaitForSeconds(5);
		arrowAnimation("up_down");
		waitForNextButton ();
		yield WaitForSeconds(1);
		phaseBool = false;
	}
	
	// phase 10 - player ends turn
//	yield waitForInput();
	
	// Enemy turn
	if (phaseID == 11 && !phaseBool) {
		phaseBool = true;
		setText(70, Vector3(0, 0, -1), "during the enemy turn,\nshobo's ship will be attacked.\nyour defense is based on\nyour ability to manage\nthe ship's conversion shields.");
		waitForNextButton ();
		yield WaitForSeconds(1);
		phaseBool = false;
	}
	
	// Enemy turn - e2h anim
	if (phaseID == 12 && !phaseBool) {
		phaseBool = true;
		setText(70, Vector3(0, 0, -1), "you can take energy damage\nand restore health\nby swiping left\nacross shobo's ship.");
		yield WaitForSeconds(3);
		arrowAnimation("right_left");
		waitForNextButton ();
		yield WaitForSeconds(1);
		phaseBool = false;
	}
	
	// phase 13 - player uses e2h shield
//	yield waitForInput();
	
	// Enemy turn - h2e anim
	if (phaseID == 14 && !phaseBool) {
		phaseBool = true;
		setText(70, Vector3(0, 0, -1), "you can take health damage\nand restore energy\nby swiping right\nacross shobo's ship.");
		yield WaitForSeconds(3);
		arrowAnimation("left_right");
		waitForNextButton ();
		yield WaitForSeconds(1);
		phaseBool = false;
	}
	
	// phase 15 - player uses h2e shield
//	yield waitForInput();
	
	// Enemy turn - end turn anim
	if (phaseID == 16 && !phaseBool) {
		phaseBool = true;
		setText(70, Vector3(0, 0, -1), "when the enemies\nfinish their attack,\nit is your turn again.");
		waitForNextButton ();
		yield WaitForSeconds(1);
		phaseBool = false;
	}
	
	// Regeneration
	if (phaseID == 17 && !phaseBool) {
		phaseBool = true;
		setText(70, Vector3(0, 0, -1), "something to remember:\n\nwhen you destroy\nan enemy ship\nshobo's ship restores some\nhealth and energy.");
		waitForNextButton ();
		yield WaitForSeconds(1);
		phaseBool = false;
	}
	
	// Tutorial end - tips
	if (phaseID == 18 && !phaseBool) {
		phaseBool = true;
		setText(70, Vector3(-2, 0, -1), "general tips:\n\ndon't let too many\nenemy waves pile up.\n\nkey to surviving\nis to confidently\nplay around\nwith the conversion shields.");
		waitForNextButton ();
		yield WaitForSeconds(1);
		phaseBool = false;
	}
	
	if (phaseID == 19) showGUI();
}

//function waitForInput () : IEnumerator {
//	while (Input.touchCount == 0) {
//		yield;
//	}
//	yield;
//}

function nextPhase () {
	phaseID++;
}

function nextButton () {
	Time.timeScale = 1;
	nextPhase();
	nextBtnBool = false;
	if (GameObject.Find("tutorial_next_btn")) GameObject.Find("tutorial_next_btn").GetComponent.<Renderer>().enabled = false;
}

function waitForNextButton () {
	nextBtnBool = true;
	Time.timeScale = 0;
}

function arrowAnimation (type : String) {
	var tempArrow : GameObject;
	switch (type) {
		case "down_up":
			tempArrow = Instantiate(touchArrow, Vector3(-3, 0, -2), Quaternion.identity * Quaternion.Euler(-90, 90, 270));
			tempArrow.transform.localScale = Vector3(0.3, 0.3, 0.3);
			(tempArrow.GetComponent("swipeArrowScript") as swipeArrowScript).endPos = Vector3(3, 0, -2);
			(gameObject.GetComponent("combatGUI_tutorial") as combatGUI_tutorial).canBombBool = true;
			break;
		case "up_down":
			tempArrow = Instantiate(touchArrow, Vector3(3, 0, -2), Quaternion.identity * Quaternion.Euler(90, 180, 0));
			tempArrow.transform.localScale = Vector3(0.3, 0.3, 0.3);
			(tempArrow.GetComponent("swipeArrowScript") as swipeArrowScript).endPos = Vector3(-3, 0, -2);
			// end turn bool
			(gameObject.GetComponent("combatGUI_tutorial") as combatGUI_tutorial).canEndTurnBool = true;
			break;
		case "left_right":
			tempArrow = Instantiate(touchArrow, Vector3(-3, 3, -2), Quaternion.identity * Quaternion.Euler(0, 90, 270));
			tempArrow.transform.localScale = Vector3(0.3, 0.3, 0.3);
			(tempArrow.GetComponent("swipeArrowScript") as swipeArrowScript).endPos = Vector3(-3, -3, -2);
			break;
		case "right_left":
			tempArrow = Instantiate(touchArrow, Vector3(-3, -3, -2), Quaternion.identity * Quaternion.Euler(0, 270, 90));
			tempArrow.transform.localScale = Vector3(0.3, 0.3, 0.3);
			(tempArrow.GetComponent("swipeArrowScript") as swipeArrowScript).endPos = Vector3(-3, 3, -2);
			break;
		default: break;
	}
}

function arrowHighlight () {
	var tempArrow = Instantiate(touchArrow, Vector3(4.5,-1,-2), Quaternion.identity * Quaternion.Euler(270,180,0));
	tempArrow.transform.localScale = Vector3(0.2, 0.2, 0.2);
	(gameObject.GetComponent("combatGUI_tutorial") as combatGUI_tutorial).canLaserBool = true;
	for (var i=0; i<3; i++) {
		tempArrow.GetComponent.<Renderer>().enabled = true;
		yield WaitForSeconds(0.2);
		tempArrow.GetComponent.<Renderer>().enabled = false;
		yield WaitForSeconds(0.2);
	}
	(tempArrow.GetComponent("swipeArrowScript") as swipeArrowScript).activeBool = false;
}

function setText (tempSize : int, tempPos : Vector3, tempText : String) {
	instrText.transform.position = tempPos;
	(instrText.GetComponent("instructionsScript") as instructionsScript).setText(tempText, tempSize);
}

function showGUI () {
	setText(50, Vector3(0, 0, -1), "");
	var guiBtns = GameObject.FindGameObjectsWithTag("guiBtn");
	for (var temp in guiBtns) {
		temp.GetComponent.<Renderer>().enabled = true;
		(temp.GetComponent("tutorialLevelGUIHandler") as tutorialLevelGUIHandler).enabled = true;
	}
	phaseID = 20;
}

function OnGUI () {
	if (highlightBool1) GUI.DrawTexture(Rect(0.35*Screen.width,0.92*Screen.height,0.3*Screen.width,0.06*Screen.height), highlightTexture, ScaleMode.StretchToFill, true, 0);
	if (highlightBool2) GUI.DrawTexture(Rect(0.15*Screen.width,0.2*Screen.height,0.7*Screen.width,0.25*Screen.height), highlightTexture, ScaleMode.StretchToFill, true, 0);
	if (highlightBool3) GUI.DrawTexture(Rect(0.68*Screen.width,0.93*Screen.height,0.3*Screen.width,0.05*Screen.height), highlightTexture, ScaleMode.StretchToFill, true, 0);
	if (highlightBool4) GUI.DrawTexture(Rect(0.01*Screen.width,0.88*Screen.height,0.35*Screen.width,0.1*Screen.height), highlightTexture, ScaleMode.StretchToFill, true, 0);
}