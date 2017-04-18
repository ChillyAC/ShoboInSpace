public var coolFont : Font;

private var left : float;
private var top : float;
private var bottom : float;
private var height : float;
private var healthBackgroundWidth1 : float;
private var healthForegroundWidth1 : float;
private var energyBackgroundWidth : float;
private var energyForegroundWidth : float;
private var healthBackgroundTexture : Texture;
private var healthForegroundTexture : Texture;
private var energyBackgroundTexture : Texture;
private var energyForegroundTexture : Texture;
private var rescueMS : GameObject;
private var menuBtn : GameObject;

private var player : GameObject;
private var playerHealthPercent : float = 0;
private var playerEnergyPercent : float = 0;
private var rescueTime : float = 0;
private var startTime : float = 0;

public var enemyDamageTaken : float = 0;
public var waveTimer : float = 0;
public var waveStart : float = 0;

private var ebombBool : boolean = false;
private var defenseBool : boolean = false;

public var gameOverBool : boolean = false;
private var endTurnBool : boolean = false;

private var leftBool : boolean = false;
private var rightBool : boolean = false;
private var upBool : boolean = false;
private var downBool : boolean = false;

function Start () {
	healthBackgroundTexture = Resources.Load("healthBackground");
	healthForegroundTexture = Resources.Load("healthForeground");
	energyBackgroundTexture = Resources.Load("energyBackground");
	energyForegroundTexture = Resources.Load("energyForeground");
	rescueMS = Resources.Load("rescueMothership");
	menuBtn = Resources.Load("guiText");
	startTime = Time.time;
	rescueTime = Random.Range(180, 361);
	Instantiate(menuBtn, Vector3(9,0,0), Quaternion.identity * Quaternion.Euler(0,0,270));
}

function Update () {
	player = GameObject.FindGameObjectWithTag("player");
	
//	if (Input.GetKeyUp("space")) (player.GetComponent("playerController") as playerController).endTurn();

	if (startTime + rescueTime - Time.time <= 0.01) {
		gameOverBool = true;
		Instantiate(rescueMS, Vector3(0, 0, 0), Quaternion.identity);
		rescueTime = 1000;
	}
	
	if (Input.touchCount > 0) {
		var touch = Input.GetTouch(0);
		var touchStartPos : Vector2;
		var touchEndPos : Vector2;
		
		switch (touch.phase) {
			case TouchPhase.Began:	touchStartPos = touch.position;
									
									if (touchStartPos.x < 0.5 * Screen.width) {leftBool = true; rightBool = false;}
									if (touchStartPos.x > 0.5 * Screen.width) {leftBool = false; rightBool = true;}
									
									if (touchStartPos.y > 0.5 * Screen.height) {upBool = true; downBool = false;}
									if (touchStartPos.y < 0.5 * Screen.height) {upBool = false; downBool = true;}
									
									if (upBool && (GameObject.FindGameObjectWithTag("gameMaster").GetComponent("turnManager") as turnManager).playersTurn == true) {
										var screenRay : Ray = Camera.main.ScreenPointToRay(touchStartPos);
										var hit : RaycastHit;
					                    if (Physics.Raycast(screenRay, hit))
					            			if (hit.collider.gameObject.tag == "enemy") {
					            				(player.GetComponent("playerController") as playerController).laserAttack(hit.collider.gameObject);
					            				upBool = false;
					            			}
					            	}
									
									break;
			
			case TouchPhase.Moved:	if ((GameObject.FindGameObjectWithTag("gameMaster").GetComponent("turnManager") as turnManager).playersTurn == true) {
										if (downBool && touch.deltaPosition.magnitude > 30 && touch.deltaPosition.magnitude/touch.deltaTime > 30) ebombBool = true;
										if (upBool && touch.deltaPosition.magnitude > 30 && touch.deltaPosition.magnitude/touch.deltaTime > 30) endTurnBool = true;
									}
									else if ((GameObject.FindGameObjectWithTag("gameMaster").GetComponent("turnManager") as turnManager).playersTurn == false) {
										if (downBool && touch.deltaPosition.magnitude > 5 && touch.deltaPosition.magnitude/touch.deltaTime > 5) defenseBool = true;
									}

									break;
			
			case TouchPhase.Ended:	touchEndPos = touch.position;
			
									if (defenseBool) {
										if (rightBool && touchEndPos.x < 0.5 * Screen.width) (player.GetComponent("playerController") as playerController).energy2health();
											else if (leftBool && touchEndPos.x > 0.5 * Screen.width) (player.GetComponent("playerController") as playerController).health2energy();
										defenseBool = false;
										downBool = false;
									}
									
									if (ebombBool && touchEndPos.y > 0.5 * Screen.height && (GameObject.FindGameObjectWithTag("gameMaster").GetComponent("turnManager") as turnManager).playersTurn == true) {
										(player.GetComponent("playerController") as playerController).ebombAttack();
										ebombBool = false;
										downBool = false;
									}
									
									if (endTurnBool && touchEndPos.y < 0.5 * Screen.height) {
										(player.GetComponent("playerController") as playerController).endTurn();
										endTurnBool = false;
										upBool = false;
									}

									break;
			
			default: break;
		}
	}
	
}

function OnGUI () {
	GUI.skin.font = coolFont;
	
	GUI.skin.label.fontSize = 0.05 * Screen.width;
	GUI.skin.label.alignment = TextAnchor.UpperLeft;
	GUI.Label(Rect(left,0.025*Screen.height,0.4*Screen.width,0.1*Screen.height),"Score\n" + enemyDamageTaken.ToString("F0"));
	GUI.skin.label.alignment = TextAnchor.UpperRight;
	if (Mathf.FloorToInt((waveStart + waveTimer - Time.time)%60.0) > 9) GUI.Label(Rect(0.58*Screen.width,0.025*Screen.height,0.4*Screen.width,0.1*Screen.height),"Next wave\n" + Mathf.FloorToInt((waveStart + waveTimer - Time.time)/60.0) + ":" + Mathf.FloorToInt((waveStart + waveTimer - Time.time)%60.0));
		else GUI.Label(Rect(0.58*Screen.width,0.025*Screen.height,0.4*Screen.width,0.1*Screen.height),"Next wave\n" + Mathf.FloorToInt((waveStart + waveTimer - Time.time)/60.0) + ":0" + Mathf.FloorToInt((waveStart + waveTimer - Time.time)%60.0));

	left = 0.02*Screen.width;
	top = 0.25*Screen.height;
	bottom = 0.93*Screen.height;
	height = 0.05*Screen.height;
	
	playerHealthPercent = (GameObject.FindGameObjectWithTag("player").GetComponent("playerController") as playerController).playerHealth/10;
	healthBackgroundWidth1 = 0.3*Screen.width;
	healthForegroundWidth1 = (0.3*Screen.width-4) * playerHealthPercent;
	GUI.DrawTexture(Rect(left, bottom, healthBackgroundWidth1, height), healthBackgroundTexture, ScaleMode.StretchToFill, true, 1.0);
	GUI.DrawTexture(Rect(left+2+(0.3*Screen.width-4 - healthForegroundWidth1), bottom+2, healthForegroundWidth1, height-4), healthForegroundTexture, ScaleMode.ScaleAndCrop, true, 1.0);
	if (playerHealthPercent <0) playerHealthPercent =0;
	
	playerEnergyPercent = (GameObject.FindGameObjectWithTag("player").GetComponent("playerController") as playerController).playerEnergy/10;
	energyBackgroundWidth = 0.3*Screen.width;
	energyForegroundWidth = (0.3*Screen.width-4) * playerEnergyPercent;
	GUI.DrawTexture(Rect(0.68*Screen.width, bottom, energyBackgroundWidth, height), energyBackgroundTexture, ScaleMode.StretchToFill, true, 1.0);
	GUI.DrawTexture(Rect(0.68*Screen.width+2, bottom+2, energyForegroundWidth, height-4), energyForegroundTexture, ScaleMode.ScaleAndCrop, true, 1.0);
	if (playerEnergyPercent <0) playerEnergyPercent =0;
	
//	GUI.skin.label.alignment = TextAnchor.UpperLeft;
//	GUI.skin.label.fontSize = 0.03 * Screen.width;
//	GUI.contentColor = Color.blue;
//	GUI.Label(Rect(0.045*Screen.width,0.05*Screen.height,0.4*Screen.width,0.2*Screen.height),"Shobo's ship health");
//	GUI.Label(Rect(0.045*Screen.width,0.905*Screen.height,0.4*Screen.width,0.2*Screen.height),"Shobo's ship energy");
	GUI.contentColor = Color.white;
	
	GUI.skin.button.fontSize = 0.05 * Screen.width;
	GUI.skin.label.fontSize = 0.05 * Screen.width;

	if ((GameObject.FindGameObjectWithTag("gameMaster").GetComponent("turnManager") as turnManager).playersTurn == true) {
		GUI.contentColor = Color.blue;
		GUI.Label(Rect(0.21*Screen.width,0.93*Screen.height,0.4*Screen.width,0.1*Screen.height),"Your turn");
		GUI.contentColor = Color.white;
//		if (GUI.Button(Rect(0.4*Screen.width,0.8*Screen.height,0.2*Screen.width,0.1*Screen.height), "end turn")) (player.GetComponent("playerController") as playerController).endTurn();
	}
	else if ((GameObject.FindGameObjectWithTag("gameMaster").GetComponent("turnManager") as turnManager).playersTurn == false) {
		GUI.contentColor = Color.red;
		GUI.Label(Rect(0.24*Screen.width,0.93*Screen.height,0.4*Screen.width,0.1*Screen.height),"Enemy turn");
		GUI.contentColor = Color.white;
	}
}