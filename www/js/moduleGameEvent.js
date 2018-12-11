//- Click tap 

function GameDown(e){
	if(gameInfo.state=="game" && gameInfo.statePlayerId==0 && gameInfo.stateGame=="shot"){
		//gameInfo.stateGame = "waiting";
		PlayerShot(0);
	}
}

//- Shot

function PlayerShot(_idPlayer){
	appMc["mcBullet"+gameInfo.effBulletsId].visible = true;
	appMc["mcBullet"+gameInfo.effBulletsId].alpha = 1;
	appMc["mcBullet"+gameInfo.effBulletsId].x = appMc["mcPlayer"+_idPlayer].x+appMc["mcPlayer"+_idPlayer+"Gun"].x+50;
	appMc["mcBullet"+gameInfo.effBulletsId].y = appMc["mcPlayer"+_idPlayer].y+appMc["mcPlayer"+_idPlayer+"Gun"].y-75;
	
	TurnPoint(appMc["mcBullet"+gameInfo.effBulletsId], appMc["mcPlayer"+_idPlayer].x, appMc["mcPlayer"+_idPlayer].y, appMc["mcPlayer"+_idPlayer].rotation);

	appMc["mcBullet"+gameInfo.effBulletsId].parentId = _idPlayer;
	
	appMc["mcBullet"+gameInfo.effBulletsId].mass = 10;
	appMc["mcBullet"+gameInfo.effBulletsId].vSpeed = 60;
	appMc["mcBullet"+gameInfo.effBulletsId].vAngle = Math.atan2(
		(appMc["mcBullet"+gameInfo.effBulletsId].y-(appMc["mcPlayer"+_idPlayer].y+appMc["mcPlayer"+_idPlayer+"Gun"].x-95)),
		(appMc["mcBullet"+gameInfo.effBulletsId].x-(appMc["mcPlayer"+_idPlayer].x+appMc["mcPlayer"+_idPlayer+"Gun"].y-10))
	);
	
	appMc["mcBullet"+gameInfo.effBulletsId].active = true;
	
	//- shake
	
	gameInfo.worldShakeX = 10;
	
	//- smoke
	
	AddSmoke(appMc["mcBullet"+gameInfo.effBulletsId].x+20, appMc["mcBullet"+gameInfo.effBulletsId].y, 80, 80, 6);
	
	//-
	
	gameInfo.effBulletsId++;
	if(gameInfo.effBulletsId==gameInfo.effBulletsTotal){
		gameInfo.effBulletsId = 0;
	}
}

//- Add smoke

function AddSmoke(_x, _y, _dx, _dy, _n){
	for(var i=0; i<_n; i++){
		appMc["mcSmoke"+gameInfo.effSmokeId].visible = true;
		appMc["mcSmoke"+gameInfo.effSmokeId].x = _x+_dx*0.5-_dx*Math.random();
		appMc["mcSmoke"+gameInfo.effSmokeId].y = _y+_dy*0.5-_dy*Math.random();
		
		appMc["mcSmoke"+gameInfo.effSmokeId].scale.x = 0;
		appMc["mcSmoke"+gameInfo.effSmokeId].scale.y = appMc["mcSmoke"+gameInfo.effSmokeId].scale.x;
		
		appMc["mcSmoke"+gameInfo.effSmokeId].alpha = 1;
		appMc["mcSmoke"+gameInfo.effSmokeId].rotation = 2*Math.PI*Math.random();
		
		appMc["mcSmoke"+gameInfo.effSmokeId].va = 0.02+0.04*Math.random();
		appMc["mcSmoke"+gameInfo.effSmokeId].vs = 0.03+0.06*Math.random();
		appMc["mcSmoke"+gameInfo.effSmokeId].vr = 0.1-0.2*Math.random();
		
		gameInfo.effSmokeId++;
		if(gameInfo.effSmokeId==gameInfo.effSmokeTotal){
			gameInfo.effSmokeId = 0;	
		}
	}
}

//- Add tracer

function AddTracer(_x, _y, _rotation=0){
	appMc["mcTracer"+gameInfo.effTracerId].visible = true;
	appMc["mcTracer"+gameInfo.effTracerId].x = _x;
	appMc["mcTracer"+gameInfo.effTracerId].y = _y;
	appMc["mcTracer"+gameInfo.effTracerId].rotation = _rotation;
	
	appMc["mcTracer"+gameInfo.effTracerId].scale.x = 1.5;
	appMc["mcTracer"+gameInfo.effTracerId].scale.y = 0.3;
	
	appMc["mcTracer"+gameInfo.effTracerId].alpha = 0;
		
	gameInfo.effTracerId++;
	if(gameInfo.effTracerId==gameInfo.effTracerTotal){
		gameInfo.effTracerId = 0;	
	}
}

//- Add spray

function AddSpray(_x, _y){
	for(var i=0; i<4; i++){
		appMc["mcSpray"+gameInfo.effSprayId].visible = true;
		appMc["mcSpray"+gameInfo.effSprayId].x = _x+20-40*Math.random();
		appMc["mcSpray"+gameInfo.effSprayId].y = _y+10-20*Math.random();
		
		appMc["mcSpray"+gameInfo.effSprayId].scale.x = 0.5+0.5*Math.random();
		appMc["mcSpray"+gameInfo.effSprayId].scale.y = 3*appMc["mcSpray"+gameInfo.effSprayId].scale.x;
		
		appMc["mcSpray"+gameInfo.effSprayId].alpha = 0.5+0.5*Math.random();
			
		appMc["mcSpray"+gameInfo.effSprayId].vy = -5-15*Math.random();
		
		gameInfo.effSprayId++;
		if(gameInfo.effSprayId==gameInfo.effSprayTotal){
			gameInfo.effSprayId = 0;	
		}
	}
}

//- Add ship crash

function AddShipCrash(_x, _y, _dx, _dy, _n){
	for(var i=0; i<_n; i++){
		appMc["mcShipCrash"+gameInfo.effShipCrashId].visible = true;
		appMc["mcShipCrash"+gameInfo.effShipCrashId].x = _x+_dx*0.5-_dx*Math.random();
		appMc["mcShipCrash"+gameInfo.effShipCrashId].y = _y+_dy*0.5-_dy*Math.random();
		
		appMc["mcShipCrash"+gameInfo.effShipCrashId].scale.x = 0.5+0.5*Math.random();
		appMc["mcShipCrash"+gameInfo.effShipCrashId].scale.y = appMc["mcShipCrash"+gameInfo.effShipCrashId].scale.x;
		
		appMc["mcShipCrash"+gameInfo.effShipCrashId].alpha = 1;
		appMc["mcShipCrash"+gameInfo.effShipCrashId].rotation = 2*Math.PI*Math.random();
		
		appMc["mcShipCrash"+gameInfo.effShipCrashId].tm = 60+60*Math.random();
		appMc["mcShipCrash"+gameInfo.effShipCrashId].vx = 20-30*Math.random();
		appMc["mcShipCrash"+gameInfo.effShipCrashId].vy = -15-20*Math.random();
		appMc["mcShipCrash"+gameInfo.effShipCrashId].vr = 0.2-0.4*Math.random();
		
		gameInfo.effShipCrashId++;
		if(gameInfo.effShipCrashId == gameInfo.effShipCrashTotal){
			gameInfo.effShipCrashId = 0;	
		}
	}
}