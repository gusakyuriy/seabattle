function InitGameObjects(){
	console.log("-> InitGameObjects");
	
	var AppCanvas = document.createElement("canvas");
	AppCanvas.id="AppCanvas";
	AppCanvas.width=appObj.graphicNormalWidth;
	AppCanvas.height=appObj.graphicNormalHeight; 

	renderer = new PIXI.autoDetectRenderer(
		appObj.graphicNormalWidth, 		// width
		appObj.graphicNormalHeight, 	// height
		AppCanvas, 						// view
		false,     						// transparent
		false     						// antialias 
	);	
	renderer.backgroundColor = 0x438eff;
	
	jQuery("#AppContainer").append(renderer.view);  	
	stage = new PIXI.Container();

	//---------------------------------------------------------------------------
	
	//- mcMain
	
	appMc.mcMain = new PIXI.Container();
	appMc.mcMain.visible=false;
	stage.addChild(appMc.mcMain);
		
		//- game
		
		appMc.mcGame = new PIXI.Container();
		appMc.mcMain.addChild(appMc.mcGame);
			
			//- game content
			
			appMc.mcGameContent = new PIXI.Container();
			appMc.mcGame.addChild(appMc.mcGameContent);
					
				appMc.mcGameContentLayer0 = new PIXI.Container();
				appMc.mcGameContent.addChild(appMc.mcGameContentLayer0);
						
					appMc.mcGameContentBg = new PIXI.Sprite();
					appMc.mcGameContentBg.texture = InfoTextures.textures["game_background"];
					appMc.mcGameContentBg.anchor.set(0.5, 0.5); 
					appMc.mcGameContentLayer0.addChild(appMc.mcGameContentBg);
					
				appMc.mcGameContentLayer1 = new PIXI.Container();
				appMc.mcGameContent.addChild(appMc.mcGameContentLayer1);
					
					//- bullet tracer
					
					for(i=0; i<gameInfo.effTracerTotal; i++){
						appMc["mcTracer"+i] = new PIXI.Sprite();
						appMc["mcTracer"+i].texture = InfoTextures.textures["eff_smoke"];
						appMc["mcTracer"+i].anchor.set(0.5, 0.5); 
						appMc["mcTracer"+i].visible = false;
						
						appMc.mcGameContentLayer1.addChild(appMc["mcTracer"+i]);
					}
					
					//- spray
					
					for(i=0; i<gameInfo.effSprayTotal; i++){
						appMc["mcSpray"+i] = new PIXI.Sprite();
						appMc["mcSpray"+i].texture = InfoTextures.textures["eff_smoke"];
						appMc["mcSpray"+i].anchor.set(0.5, 0.5); 
						appMc["mcSpray"+i].visible = false;
						
						appMc.mcGameContentLayer1.addChild(appMc["mcSpray"+i]);
					}
					
					//- bullets
					
					for(i=0; i<gameInfo.effBulletsTotal; i++){
						appMc["mcBullet"+i] = new PIXI.Sprite();
						appMc["mcBullet"+i].texture = InfoTextures.textures["bullet_0"];
						appMc["mcBullet"+i].anchor.set(0.5, 0.5); 
						appMc["mcBullet"+i].visible = false;
						
						appMc.mcGameContentLayer1.addChild(appMc["mcBullet"+i]);
					}
					
					//- ships crash eff
					
					j=0;
					for(i=0; i<gameInfo.effShipCrashTotal; i++){
						appMc["mcShipCrash"+i] = new PIXI.Sprite();
						appMc["mcShipCrash"+i].texture = InfoTextures.textures["ship_crash_"+j];
						appMc["mcShipCrash"+i].anchor.set(0.5, 0.5); 
						appMc["mcShipCrash"+i].visible = false;
						
						appMc.mcGameContentLayer1.addChild(appMc["mcShipCrash"+i]);
						
						j++;
						if(j==4){ j=1; }
					}
						
					//- players
					
					appMc.mcPlayer0 = new PIXI.Container();
					appMc.mcPlayer0.x = gameInfo.heroMenuX;
					appMc.mcGameContentLayer1.addChild(appMc.mcPlayer0);
				
						appMc.mcPlayer0Gun = new PIXI.Sprite();
						appMc.mcPlayer0Gun.texture = InfoTextures.textures["gun_0"];
						appMc.mcPlayer0Gun.anchor.set(0.5, 1); 
						appMc.mcPlayer0Gun.x=100;
						appMc.mcPlayer0Gun.y=-45;
						appMc.mcPlayer0.addChild(appMc.mcPlayer0Gun);
						
						appMc.mcPlayer0Ship = new PIXI.Sprite();
						appMc.mcPlayer0Ship.texture = InfoTextures.textures["ship_0"];
						appMc.mcPlayer0Ship.anchor.set(0.5, 0.9); 
						appMc.mcPlayer0.addChild(appMc.mcPlayer0Ship);
							
						appMc.mcPlayer0Debug = new PIXI.Graphics();
						appMc.mcPlayer0.addChild(appMc.mcPlayer0Debug);
						
					appMc.mcPlayer1 = new PIXI.Container();
					appMc.mcPlayer1.scale.x = -1;
					appMc.mcPlayer1.visible = false;
					appMc.mcGameContentLayer1.addChild(appMc.mcPlayer1);
				
						appMc.mcPlayer1Gun = new PIXI.Sprite();
						appMc.mcPlayer1Gun.texture = InfoTextures.textures["gun_0"];
						appMc.mcPlayer1Gun.anchor.set(0.5, 1); 
						appMc.mcPlayer1Gun.x=100;
						appMc.mcPlayer1Gun.y=-45;
						appMc.mcPlayer1Gun.visible = false;
						appMc.mcPlayer1.addChild(appMc.mcPlayer1Gun);
						
						appMc.mcPlayer1Ship = new PIXI.Sprite();
						appMc.mcPlayer1Ship.texture = InfoTextures.textures["ship_0"];
						appMc.mcPlayer1Ship.anchor.set(0.5, 0.9); 
						appMc.mcPlayer1.addChild(appMc.mcPlayer1Ship);
						
						appMc.mcPlayer1Debug = new PIXI.Graphics();
						appMc.mcPlayer1.addChild(appMc.mcPlayer1Debug);
						
					//- water
					
					appMc.mcGameWater = new PIXI.Graphics();
					appMc.mcGameContentLayer1.addChild(appMc.mcGameWater);
				
					//- smoke
					
					for(i=0; i<gameInfo.effSmokeTotal; i++){
						appMc["mcSmoke"+i] = new PIXI.Sprite();
						appMc["mcSmoke"+i].texture = InfoTextures.textures["eff_smoke"];
						appMc["mcSmoke"+i].anchor.set(0.5, 0.5); 
						appMc["mcSmoke"+i].visible = false;
						
						appMc.mcGameContentLayer1.addChild(appMc["mcSmoke"+i]);
					}
		
		//- ui
		
		appMc.mcMainUI = new PIXI.Container();
		appMc.mcMain.addChild(appMc.mcMainUI);
			
			//- mcMainUIWind
			
			appMc.mcMainUIWind = new PIXI.Container();
			appMc.mcMainUIWind.visible = false;
			appMc.mcMainUI.addChild(appMc.mcMainUIWind);
							
				appMc.mcMainUIWindRope = new PIXI.Container();
				appMc.mcMainUIWindRope.x = -InfoTextures.bitmaps["ui_wind_control_bg"].width*0.5;
				appMc.mcMainUIWindRope.points = [];
				for(i=0; i<10; i++){
					appMc.mcMainUIWindRope.points.push({x:(i/9)*InfoTextures.bitmaps["ui_wind_control_bg"].width, y:0, a:60*i});
				}
				appMc.mcMainUIWind.addChild(appMc.mcMainUIWindRope);
					
					appMc.mcMainUIWindRopeBg = new PIXI.Rope(InfoTextures.textures["ui_wind_control_bg"], appMc.mcMainUIWindRope.points);
					appMc.mcMainUIWindRope.addChild(appMc.mcMainUIWindRopeBg);
					
					appMc.mcMainUIWindRopeBar = new PIXI.Rope(InfoTextures.textures["ui_wind_control_bar"], appMc.mcMainUIWindRope.points);
					appMc.mcMainUIWindRope.addChild(appMc.mcMainUIWindRopeBar);
			
					appMc.mcMainUIWindRopeMask = new PIXI.Graphics();
					appMc.mcMainUIWindRopeMask.beginFill(0x000000, 1);
					appMc.mcMainUIWindRopeMask.drawRect(0, -InfoTextures.bitmaps["ui_wind_control_bar"].height*0.5-200, InfoTextures.bitmaps["ui_wind_control_bar"].width, InfoTextures.bitmaps["ui_wind_control_bar"].height+200);
					appMc.mcMainUIWindRopeMask.endFill();
					appMc.mcMainUIWindRope.addChild(appMc.mcMainUIWindRopeMask);
					
					appMc.mcMainUIWindRopeBar.mask = appMc.mcMainUIWindRopeMask;
			
			//- mcMainUIMoney
					
			appMc.mcMainUIMoney = new PIXI.Container();
			appMc.mcMainUI.addChild(appMc.mcMainUIMoney);
							
				appMc.mcMainUIMoneyCoin = new PIXI.Container();
				appMc.mcMainUIMoneyCoin.x=40;
				appMc.mcMainUIMoneyCoin.y=40;
				appMc.mcMainUIMoney.addChild(appMc.mcMainUIMoneyCoin);
						
					appMc.mcMainUIMoneyCoinB = new PIXI.Sprite();
					appMc.mcMainUIMoneyCoinB.texture = InfoTextures.textures["game_icon_coin_0"];
					appMc.mcMainUIMoneyCoinB.anchor.set(0.5, 0.5); 
					appMc.mcMainUIMoneyCoin.addChild(appMc.mcMainUIMoneyCoinB);
					
					appMc.mcMainUIMoneyCoinT = new PIXI.Text("100", {
						fontFamily:'Coiny-Regular',
						fontSize:'36px',
						fontWeight:"normal",
						fill:'#ffffff',
						align : 'left',
						/*wordWrap: true,
						wordWrapWidth: 870,*/
					});
					appMc.mcMainUIMoneyCoinT.style.font = "36px Coiny-Regular";
					appMc.mcMainUIMoneyCoinT.anchor.set(0, 0.5);
					appMc.mcMainUIMoneyCoinT.position.x = 30;
					appMc.mcMainUIMoneyCoinT.position.y = 0;
					appMc.mcMainUIMoneyCoin.addChild(appMc.mcMainUIMoneyCoinT);
					
				appMc.mcMainUIMoneyCrystal = new PIXI.Container();
				appMc.mcMainUIMoneyCrystal.x=40;
				appMc.mcMainUIMoneyCrystal.y=90;
				appMc.mcMainUIMoney.addChild(appMc.mcMainUIMoneyCrystal);
						
					appMc.mcMainUIMoneyCrystalB = new PIXI.Sprite();
					appMc.mcMainUIMoneyCrystalB.texture = InfoTextures.textures["game_icon_crystal"];
					appMc.mcMainUIMoneyCrystalB.anchor.set(0.5, 0.5); 
					appMc.mcMainUIMoneyCrystal.addChild(appMc.mcMainUIMoneyCrystalB);
					
					appMc.mcMainUIMoneyCrystalT = new PIXI.Text("0", {
						fontFamily:'Coiny-Regular',
						fontSize:'36px',
						fontWeight:"normal",
						fill:'#ffffff',
						align : 'left',
						/*wordWrap: true,
						wordWrapWidth: 870,*/
					});
					appMc.mcMainUIMoneyCrystalT.style.font = "36px Coiny-Regular";
					appMc.mcMainUIMoneyCrystalT.anchor.set(0, 0.5);
					appMc.mcMainUIMoneyCrystalT.position.x = 30;
					appMc.mcMainUIMoneyCrystalT.position.y = 0;
					appMc.mcMainUIMoneyCrystal.addChild(appMc.mcMainUIMoneyCrystalT);
			
			//- mcMainUICountDownT
			
			appMc.mcMainUICountDownT = new PIXI.Text("3", {
				fontFamily:'Coiny-Regular',
				fontSize:'260px',
				fontWeight:"normal",
				fill:'#ffffff',
				align : 'center',
			});
			appMc.mcMainUICountDownT.visible = false;
			appMc.mcMainUICountDownT.style.font = "260px Coiny-Regular";
			appMc.mcMainUICountDownT.anchor.set(0.5, 0.5);
			appMc.mcMainUI.addChild(appMc.mcMainUICountDownT);
			
		//- main menu
		
		appMc.mcMainMenu = new PIXI.Container();
		appMc.mcMain.addChild(appMc.mcMainMenu);
	
			appMc.mcMainMenuBg = new PIXI.Sprite();
			appMc.mcMainMenuBg.texture = InfoTextures.textures["main_menu_bg"];
			appMc.mcMainMenuBg.anchor.set(1, 0.5); 
			appMc.mcMainMenu.addChild(appMc.mcMainMenuBg);
				
			appMc.mcMainMenuContent = new PIXI.Container();
			appMc.mcMainMenuContent.x=-450;
			appMc.mcMainMenu.addChild(appMc.mcMainMenuContent);
			
				appMc.mcMainMenuLogo = new PIXI.Sprite();
				appMc.mcMainMenuLogo.texture = InfoTextures.textures["logo_ru"];
				appMc.mcMainMenuLogo.anchor.set(0.5, 0.5);				
				appMc.mcMainMenuLogo.y=-170;
				appMc.mcMainMenuContent.addChild(appMc.mcMainMenuLogo);
				
				appMc.mcMainMenuBtnStart = new PIXI.Sprite();
				appMc.mcMainMenuBtnStart.texture = InfoTextures.textures["btn_start"];
				appMc.mcMainMenuBtnStart.anchor.set(0.5, 0.5); 
				appMc.mcMainMenuBtnStart.y=70;
				appMc.mcMainMenuContent.addChild(appMc.mcMainMenuBtnStart);
				
				appMc.mcMainMenuBtnSound = new PIXI.Sprite();
				appMc.mcMainMenuBtnSound.texture = InfoTextures.textures["btn_sound_on"];
				appMc.mcMainMenuBtnSound.anchor.set(0.5, 0.5); 
				appMc.mcMainMenuBtnSound.x=-65;
				appMc.mcMainMenuBtnSound.y=250;
				appMc.mcMainMenuContent.addChild(appMc.mcMainMenuBtnSound);
				
				appMc.mcMainMenuBtnLang = new PIXI.Sprite();
				appMc.mcMainMenuBtnLang.texture = InfoTextures.textures["btn_language"];
				appMc.mcMainMenuBtnLang.anchor.set(0.5, 0.5); 
				appMc.mcMainMenuBtnLang.x=65;
				appMc.mcMainMenuBtnLang.y=250;
				appMc.mcMainMenuContent.addChild(appMc.mcMainMenuBtnLang);
			
		//- popups
		
		appMc.mcPopups = new PIXI.Container();
		appMc.mcPopups.visible = false;
		appMc.mcMain.addChild(appMc.mcPopups);
		
			appMc.mcPopupsBg = new PIXI.Graphics();
			appMc.mcPopupsBg.beginFill(0x0a1224, 0.7);
			appMc.mcPopupsBg.drawRect(-appObj.graphicFullWidth*0.5, -appObj.graphicFullHeight*0.5, appObj.graphicFullWidth, appObj.graphicFullHeight);
			appMc.mcPopupsBg.endFill();
			appMc.mcPopups.addChild(appMc.mcPopupsBg);
			
			appMc.mcPopupsContent = new PIXI.Container();
			appMc.mcPopups.addChild(appMc.mcPopupsContent);
			
				appMc.mcPopupsContentBg = new PIXI.Sprite();
				appMc.mcPopupsContentBg.texture = InfoTextures.textures["popup_win"];
				appMc.mcPopupsContentBg.anchor.set(0.5, 0.5); 
				appMc.mcPopupsContent.addChild(appMc.mcPopupsContentBg);
			
				appMc.mcPopupsContenBtnMenu = new PIXI.Sprite();
				appMc.mcPopupsContenBtnMenu.texture = InfoTextures.textures["popup_btn_menu"];
				appMc.mcPopupsContenBtnMenu.anchor.set(0.5, 0.5); 
				appMc.mcPopupsContenBtnMenu.y=245;
				appMc.mcPopupsContenBtnMenu.x=-90;
				appMc.mcPopupsContent.addChild(appMc.mcPopupsContenBtnMenu);
			
				appMc.mcPopupsContenBtnNext = new PIXI.Sprite();
				appMc.mcPopupsContenBtnNext.texture = InfoTextures.textures["popup_btn_next"];
				appMc.mcPopupsContenBtnNext.anchor.set(0.5, 0.5); 
				appMc.mcPopupsContenBtnNext.y=235;
				appMc.mcPopupsContenBtnNext.x=90;
				appMc.mcPopupsContent.addChild(appMc.mcPopupsContenBtnNext);
			
		
		
	//---------------------------------------------------------------------------
	//- Water points
	
	j=0;
	k=0;
	for(i=0; i<gameInfo.totalWP; i++){
		gameInfo.waterPoint.push({
			x	: i*gameInfo.worldWidth/(gameInfo.totalWP-1)-gameInfo.worldWidth*0.5,
			y	: 0,
			axk	: (0.8+0.2*Math.cos(k*toRAD)),
			ay	: j,
			
			dy	: 0,
			ady	: 0,
		});
		
		j-=20;
		if(j<0){ j+=360; }
		if(j>360){ j-=360; }
		
		k-=30;
		if(k<0){ k+=360; }
		if(k>360){ k-=360; }
	}
	
	//---------------------------------------------------------------------------
	//- EVENTS
	
	//- game
	
	appMc.mcGameContent.interactive = true;
	appMc.mcGameContent.on("pointerdown", GameDown);
	
	//- main menu
	
	appMc.mcMainMenuBtnStart.interactive = true;
	appMc.mcMainMenuBtnStart.on("pointerup", PlayGame);
	
	//- popups
	
	appMc.mcPopupsBg.interactive = true;
	
	appMc.mcPopupsContenBtnMenu.interactive = true;
	appMc.mcPopupsContenBtnMenu.on("pointerup", CloseGame);
	
	appMc.mcPopupsContenBtnNext.interactive = true;
	appMc.mcPopupsContenBtnNext.on("pointerup", NextGame);
	
	//---------------------------------------------------------------------------
	//- SAVE OBJECTS
	
	
	//---------------------------------------------------------------------------
	//- RESIZE
	
	TweenMax.to(appObj, 0.5, {overflow:"all", onComplete:InitSizeApp});    
    jQuery(window).resize(InitSizeApp);
}
	
// -----------------------------------------------------------------------------------
// Resize

function InitSizeApp(){	
	//- размеры
	
	appObj.mainWidth	= Math.ceil(Math.max(jQuery(window).width(), jQuery(window).height()));
	appObj.mainHeight	= Math.ceil(Math.min(jQuery(window).width(), jQuery(window).height()));
	appObj.canvasWidth	= Math.ceil(appObj.canvasScale*appObj.mainWidth);
	appObj.canvasHeight	= Math.ceil(appObj.canvasScale*appObj.mainHeight); 
		
	renderer.view.style.width	= appObj.mainWidth+"px";
	renderer.view.style.height	= appObj.mainHeight+"px";							
	renderer.view.width			= appObj.canvasWidth;
	renderer.view.height		= appObj.canvasHeight;
	
	renderer.resize(appObj.canvasWidth, appObj.canvasHeight);
	
	stage.position.set(Math.ceil(appObj.canvasWidth*0.5), Math.ceil(appObj.canvasHeight*0.5));
	
	//---------------------------------------------------------------------------
	
	appMc.mcMain.scale.set(1, 1);
	appMc.mcMain.scale.x = appObj.canvasWidth/appObj.graphicNormalWidth;
	appMc.mcMain.scale.y = appMc.mcMain.scale.x;
	if(appMc.mcMain.scale.y*appObj.graphicNormalHeight > appObj.canvasHeight){
		appMc.mcMain.scale.y = appObj.canvasHeight/appObj.graphicNormalHeight;
		appMc.mcMain.scale.x = appMc.mcMain.scale.y;
	}
			
	//---------------------------------------------------------------------------
	
	appMc.mcMainMenu.x = appObj.graphicFullWidth*0.5;
	
	appMc.mcMainUIMoney.x = -appObj.canvasWidth*0.5/appMc.mcMain.scale.x;
	appMc.mcMainUIMoney.y = -appObj.canvasHeight*0.5/appMc.mcMain.scale.y;
	
	appMc.mcMainUIWind.y = -appObj.canvasHeight*0.5/appMc.mcMain.scale.y+InfoTextures.bitmaps["ui_wind_control_bg"].height*0.7;
	
	//---------------------------------------------------------------------------
	//- SAVE POSITIONS OBJECTS
	
	SavePositionObjects();
	
	//---------------------------------------------------------------------------
	
	if(appObj.stageSizeInit==false){
		appObj.stageSizeInit = true;	
		
		//---------------------------------------------------------------------------
		//- USER INFORMATION SAVED
		
		appObj.sdInfo.isSound=1;
		appObj.sdInfo.idLang=0;
		
		/*
		try{				
			appObj.sdInfo.idUser=cordova.platformId+'_'+Math.random().toString(36).substr(2, 9)+'_'+appObj.width+'_'+appObj.height;
		}catch(e){
			appObj.sdInfo.idUser='none_'+Math.random().toString(36).substr(2, 9)+'_'+appObj.width+'_'+appObj.height;
		}
		 
		if(localStorage.getItem(appObj.sdId)){
			appObj.sdInfo=JSON.parse(localStorage.getItem(appObj.sdId));
		}else{
			try{
				navigator.globalization.getPreferredLanguage(
					function (language) {
						if(((language.value).toLocaleLowerCase()).indexOf("en")!=-1){								
							appObj.sdInfo.idLang=1;								
						}		
						SaveUserInfo();
						
						globalLangId=appObj.sdInfo.idLang;
						
						UpdateLanguage();
					},
					function () {}
				);
			}catch(e){}				
			SaveUserInfo();
		} 

		if(appObj.sdInfo.isSound==0){
			AllSoundMute(true);
		}
		if(appObj.sdInfo.isTitles==0){			
			appMc.mcMenu_BtnTitlesBg.texture=InfoTextures["basic"]["basic_btn_titles_no"];
			appMc.mcUI_Titles.visible = false;
		}else{
			appMc.mcUI_Titles.visible = true;
		}
		
		globalLangId=appObj.sdInfo.idLang;
		
		*/
		
		//-
		/*
		appObj.codeStr=Base64.encode("info:"+appObj.sdInfo.idUser+":"+appObj.sdInfo.idLevel+":"+appObj.sdInfo.idPoint+":"+appObj.sdInfo.idLang+":"+appObj.sdInfo.isFinal);
		appObj.codeStr=Base64.encode(appObj.codeStr);

		RequestServer("http://games.studiocation.com/mod_game_if.php", {cm:appObj.codeStr}, AnswerServer);
		*/
		
		//---------------------------------------------------------------------------
		//- ENTER FRAME		
		
		StageEF();
		
		//---------------------------------------------------------------------------
		//- OPEN APP
		
		jQuery("#AppContainer").css("visibility", "visible");
		appMc.mcMain.visible = true;
		
	}
}	

