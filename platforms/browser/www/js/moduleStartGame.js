function PlayGame(e){
	if(gameInfo.state != "game"){
		//- reboot
		
		RebootPositionObject(appMc.mcMainMenu);	
		RebootPositionObject(appMc.mcGameContentLayer1);

		//- animation 
		
		TweenMax.to(appMc.mcMainMenu, 					0.50, {delay:0.0, overflow:"all", x:appMc.mcMainMenu.m_x+1500, ease:Expo.easeIn});    
		
		//- set settings game
		
		SetSettingsGame(); 
	}
}

function NextGame(e){
	if(gameInfo.state != "game"){
		RebootPositionObject(appMc.mcPopups);
		
		TweenMax.to(appMc.mcPopups,	0.2, {delay:0.0, overflow:"all", alpha:0});  
		
		SetSettingsGame();
	}
}

function SetSettingsGame(){
	gameInfo.state = "game";
	gameInfo.stateGame = "start";
	
	//- reboot
	
	RebootPositionObject(appMc.mcMainUIWind);
	RebootPositionObject(appMc.mcMainUICountDownT);	
	RebootPositionObject(appMc["mcPlayer"+1]);	

	//- wind
	
	gameInfo.windToForce = LevelInfo[gameInfo.player0.level].wind[0]+(LevelInfo[gameInfo.player0.level].wind[1]-LevelInfo[gameInfo.player0.level].wind[0])*Math.random();
	
	appMc.mcMainUIWind.visible = true;
	appMc.mcMainUIWindRopeMask.scale.x = 0;

	//- enemy
	
	appMc["mcPlayer"+1].visible = true;
	appMc["mcPlayer"+1].alpha = 1;
	appMc["mcPlayer"+1].x = -appMc["mcPlayer"+1].scale.x*LevelInfo[gameInfo.player0.level].players.x;
	
	//- animation
	
	TweenMax.to(appMc.mcGameContentLayer1.scale, 	0.60, {delay:0.1, overflow:"all", x:LevelInfo[gameInfo.player0.level].camera.scale, y:LevelInfo[gameInfo.player0.level].camera.scale, ease:Expo.easeInOut});    
	TweenMax.to(appMc["mcPlayer"+0], 				0.65, {delay:0.1, overflow:"all", x:-appMc["mcPlayer"+0].scale.x*LevelInfo[gameInfo.player0.level].players.x, ease:Expo.easeInOut});    
	TweenMax.from(appMc.mcMainUIWind, 				0.60, {delay:0.5, overflow:"all", y:appMc.mcMainUIWind.m_y-500, ease:Expo.easeInOut});    

	//- countdown
	
	appMc.mcMainUICountDownT.text = "3";
	appMc.mcMainUICountDownT.visible = true;
	
	TweenMax.from(appMc.mcMainUICountDownT,			0.10, {delay:0.7, overflow:"all", alpha:0});    
	TweenMax.from(appMc.mcMainUICountDownT.scale,	0.30, {delay:0.7, overflow:"none", x:1.5, y:1.5, ease:Expo.easeOut});    
	TweenMax.to(appMc.mcMainUICountDownT.scale,		0.10, {delay:1.6, overflow:"none", x:1.5, y:1.5, onComplete:SetCountDown, onCompleteParams:["2"]});    
	TweenMax.to(appMc.mcMainUICountDownT.scale,		0.30, {delay:1.7, overflow:"none", x:1.0, y:1.0, ease:Back.easeOut});    
	TweenMax.to(appMc.mcMainUICountDownT.scale,		0.10, {delay:2.6, overflow:"none", x:1.5, y:1.5, onComplete:SetCountDown, onCompleteParams:["1"]});    
	TweenMax.to(appMc.mcMainUICountDownT.scale,		0.30, {delay:2.7, overflow:"none", x:1.0, y:1.0, ease:Back.easeOut}); 
	TweenMax.to(appMc.mcMainUICountDownT.scale,		0.20, {delay:3.4, overflow:"none", x:1.5, y:1.5});    
	TweenMax.to(appMc.mcMainUICountDownT,			0.20, {delay:3.4, overflow:"none", alpha:0, onComplete:StartGame});  
}

function SetCountDown(_text){
	appMc.mcMainUICountDownT.text = _text;
}

function StartGame(){
	appMc.mcMainMenu.visible = false;
	appMc.mcPopups.visible = false;
	appMc.mcMainUICountDownT.visible = false;
	gameInfo.stateGame = "shot";
}