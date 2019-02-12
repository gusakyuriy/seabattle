//- VALUE
var i,j,k,_key;

var isGlobalActive=true;

//- APP INFO

var appObj={ 
	appPause			: false,
	stageSizeInit		: false,
	
	canvasScale			: 1.2,
	tmRenderFPS			: 2.0,
	
	graphicNormalWidth	: 1280,
	graphicNormalHeight	: 720, 
	graphicFullWidth	: 1700, 
	graphicFullHeight	: 1000, 
	
	orientation			: "landscape",
	
	sdId				: "game_seabattle_001",
	sdInfo				: {},
	
	tmFPS				: 0
};

//- PIXI

var renderer;
var stage;

var appMc={};

//- GAME PHYSICS 

var gameInfo={ 
	//- world
	
	graviryMassK	: 0.003,
					
	worldWidth		: 12000,
	worldHeight		: 4000, 
	
	worldScaleToY	: -350,
	
	worldShakeA		: 0,
	worldShakeX		: 0,
	worldShakeY		: 0,
	
	//- app state
	
	state			: "menu",	// menu | game | 
	stateGame		: "shot",	// start | shot | pause | 
	statePlayerId	: 0,
	
	//- player info
	
	heroMenuX		: -260,
	
	player0			: {
			shipId	: 0,
			level	: 0,
		},	
	player1			: {
			shipId	: 0,
			level	: 0,
		},

	//- eff objects
	
	effBulletsTotal	: 50,
	effBulletsId	: 0,
	
	effSmokeTotal	: 100,
	effSmokeId		: 0,
	
	effTracerTotal	: 100,
	effTracerId		: 0,
	
	effShipCrashTotal	: 50,
	effShipCrashId		: 0,
	
	effSprayTotal	: 50,
	effSprayId		: 0,
	
	//- water and weather
	
	seaLevel		: 550,
	
	totalWP			: 95,
	waterPoint		: [],
	waterColor		: 0x2663d5,
	waterAmplitude	: 150,
	windToForce		: 0,
	windForce		: 0,	// 0-1
	windMenuForce	: 0.05,
	
	//- debug
	
	debug			: false 
}

//- MATH

var toRAD = Math.PI/180;

//- INIT APP

if(window.cordova !== undefined){
	document.addEventListener("deviceready", AppInit, false);
}else{
	window.onload = AppInit;
}

function AppInit(){    
    console.log("-> AppInit");
	
	//- NO SLEEP
	
    try{
        window.powermanagement.acquire();
    }catch(e){};
            
    //- STATUSBAR
	
    try{
        StatusBar.hide();
    }catch(e){};
    
	//- NO SOUNDS INACTIVE APP
	
	try{
		document.addEventListener("pause", 		OnAppPause);		
		document.addEventListener("menubutton", OnAppPause);		
		document.addEventListener("resume", 	OnAppResume);
	}catch(e){
		
	}

	//- START LOAD DATA
	
	LoadFonts(CompleLoadFonts);
}

function CompleLoadFonts(){
	console.log("-> CompleLoadFonts");
	 
	LoadTextures(InitGameObjects);	
}

// -----------------------------------------------------------------------------------

function OnAppPause(e){	
	appObj.appPause=true;
	Howler.mute(true); 
}
function OnAppResume(e){
	if(appObj.appPause==true){
		appObj.appPause=false;
		if(appObj.sdInfo.isSound==1){
			setTimeout(function() {
				Howler.mute(false); 
			}, 10); 
		}
	}
}		