function EndGame(){
	if(gameInfo.state != "endgame"){
		gameInfo.state = "endgame";
	
		RebootPositionObject(appMc.mcPopups);	
		RebootPositionObject(appMc.mcPopupsContent);	
		
		TweenMax.from(appMc.mcPopups,	0.1, {delay:1.0, overflow:"all", onComplete:EndGameResult});    
	}	
}
function EndGameResult(){
	appMc.mcPopups.visible = true;
	
	appMc.mcPopupsContentBg.texture = InfoTextures.textures["popup_win"];
	
	TweenMax.from(appMc.mcPopups,				0.2, {delay:0.0, overflow:"all", alpha:0});    
	TweenMax.from(appMc.mcPopupsContent.scale,	0.3, {delay:0.0, overflow:"all", x:"+=0.1", y:"+=0.1", ease:Back.easeOut}); 
	
	TweenMax.to(appMc.mcMainUIWind, 			0.3, {delay:0.0, overflow:"all", y:appMc.mcMainUIWind.m_y-500, ease:Expo.easeIn});
}

//-------------------------------------------------------------------------------------------------
//- CloseGame

function CloseGame(){
	gameInfo.state = "menu";
	
	RebootPositionObject(appMc.mcMainMenu);
	RebootPositionObject(appMc.mcPopups);
	RebootPositionObject(appMc["mcPlayer"+0]);	
	RebootPositionObject(appMc["mcPlayer"+1]);	
	RebootPositionObject(appMc.mcGameContentLayer1);
	
	gameInfo.windToForce = gameInfo.windMenuForce;
}