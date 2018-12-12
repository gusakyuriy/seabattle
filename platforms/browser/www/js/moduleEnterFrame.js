//---------------------------------------------------
//- StageEF

function StageEF(){		
	appObj.tmFPS++;	
	if(appObj.tmFPS>=appObj.tmRenderFPS){
		
		//- SHAKE
		
		if(gameInfo.worldShakeX!=0 || gameInfo.worldShakeY!=0){
			gameInfo.worldShakeA += 30;	
			if(gameInfo.worldShakeA>360){ gameInfo.worldShakeA -= 360; }
			
			appMc.mcGameContent.x = gameInfo.worldShakeX*Math.cos(gameInfo.worldShakeA*toRAD);
			appMc.mcGameContent.y = gameInfo.worldShakeY*Math.cos(gameInfo.worldShakeA*toRAD);
			
			gameInfo.worldShakeX *= 0.9;
			if(gameInfo.worldShakeX<1){ gameInfo.worldShakeX=0; }
			gameInfo.worldShakeY *= 0.9;
			if(gameInfo.worldShakeY<1){ gameInfo.worldShakeY=0; }
		}
		
		//- WIND
		
		gameInfo.windForce = gameInfo.windToForce-0.95*(gameInfo.windToForce-gameInfo.windForce);
		
		//- WATER
		
		// position
		
		for(i=0; i<gameInfo.totalWP; i++){				
			gameInfo.waterPoint[i].ay += 7*(0.4+0.6*gameInfo.windForce);
			if(gameInfo.waterPoint[i].ay>360){ gameInfo.waterPoint[i].ay-=360; }
			
			gameInfo.waterPoint[i].y = gameInfo.seaLevel+gameInfo.waterAmplitude*(0.2+0.8*gameInfo.windForce)*Math.cos(gameInfo.waterPoint[i].ay*toRAD)*gameInfo.waterPoint[i].axk;
			
			if(gameInfo.waterPoint[i].dy>0){
				gameInfo.waterPoint[i].ady += 25;
				if(gameInfo.waterPoint[i].ady>360){ gameInfo.waterPoint[i].ady -= 360; }
				
				gameInfo.waterPoint[i].dy *= 0.95;
				if(gameInfo.waterPoint[i].dy<1){
					gameInfo.waterPoint[i].dy = 0;	
				}
				
				gameInfo.waterPoint[i].y += gameInfo.waterPoint[i].dy*Math.cos(gameInfo.waterPoint[i].ady*toRAD);
			}
		}
		
		// drawing
		
		appMc.mcGameWater.clear();
		
		for(j=0; j<2; j++){
			appMc.mcGameWater.beginFill(gameInfo.waterColor, 0.5);
			appMc.mcGameWater.moveTo(-gameInfo.worldWidth*0.5, gameInfo.worldHeight*0.5);
		
			for(i=0; i<gameInfo.totalWP; i++){
				appMc.mcGameWater.lineTo(gameInfo.waterPoint[i].x+150*j, gameInfo.waterPoint[i].y+20*j);
			}
		
			appMc.mcGameWater.lineTo(gameInfo.worldWidth*0.5, gameInfo.worldHeight*0.5);
			appMc.mcGameWater.lineTo(-gameInfo.worldWidth*0.5, gameInfo.worldHeight*0.5);
			appMc.mcGameWater.endFill();
		}
		
		//- PLAYER
		
		for(j=0; j<2; j++){

			if(appMc["mcPlayer"+j].old_x != appMc["mcPlayer"+j].x){
				appMc["mcPlayer"+j]._minX	= 100;
				appMc["mcPlayer"+j]._minXid	= 0;
				for(i=0; i<gameInfo.totalWP; i++){
					if(appMc["mcPlayer"+j]._minX > Math.abs(gameInfo.waterPoint[i].x-appMc["mcPlayer"+j].x)){
						appMc["mcPlayer"+j]._minX = Math.abs(gameInfo.waterPoint[i].x-appMc["mcPlayer"+j].x);
						appMc["mcPlayer"+j]._minXid = i;
					}
				}
				
				appMc["mcPlayer"+j]._minXid0 = appMc["mcPlayer"+j]._minXid-1;
				appMc["mcPlayer"+j]._minXid1 = appMc["mcPlayer"+j]._minXid+1;
			}
			
			appMc["mcPlayer"+j].old_x = appMc["mcPlayer"+j].x;
			appMc["mcPlayer"+j].y = gameInfo.waterPoint[appMc["mcPlayer"+j]._minXid].y;
			appMc["mcPlayer"+j].to_rotation = 1.7*Math.atan2((gameInfo.waterPoint[appMc["mcPlayer"+j]._minXid1].y-gameInfo.waterPoint[appMc["mcPlayer"+j]._minXid0].y), (gameInfo.waterPoint[appMc["mcPlayer"+j]._minXid1].x-gameInfo.waterPoint[appMc["mcPlayer"+j]._minXid0].x));
			
			appMc["mcPlayer"+j].rotation = appMc["mcPlayer"+j].to_rotation - 0.9*(appMc["mcPlayer"+j].to_rotation-appMc["mcPlayer"+j].rotation);
			
			//-
			
			if(gameInfo.debug){
				appMc["mcPlayer"+j+"Debug"].clear();
				appMc["mcPlayer"+j+"Debug"].beginFill(0xff0000, 0.6);
				for(i=0; i<ShipInfo[gameInfo["player"+j].shipId].rect.length; i++){
					appMc["mcPlayer"+j+"Debug"].drawRect(
						ShipInfo[gameInfo["player"+j].shipId].rect[i].x,
						ShipInfo[gameInfo["player"+j].shipId].rect[i].y,
						ShipInfo[gameInfo["player"+j].shipId].rect[i].width,
						ShipInfo[gameInfo["player"+j].shipId].rect[i].height
					);
				}
				appMc["mcPlayer"+j+"Debug"].endFill();
			}
		}
		
		//- GAME 
		
		if(gameInfo.state=="game"){
			
		}
		
		//- GAME UI WIND
		
		appMc.mcMainUIWindRopeMask.to_scale = gameInfo.windForce;			
		appMc.mcMainUIWindRopeMask.scale.x = appMc.mcMainUIWindRopeMask.to_scale - 0.95*(appMc.mcMainUIWindRopeMask.to_scale-appMc.mcMainUIWindRopeMask.scale.x);
		
		for(i=1; i<appMc.mcMainUIWindRope.points.length; i++){
			appMc.mcMainUIWindRope.points[i].a+=20*(0.5+0.5*gameInfo.windForce);
			if(appMc.mcMainUIWindRope.points[i].a>360){ appMc.mcMainUIWindRope.points[i].a-=360; }
			
			appMc.mcMainUIWindRope.points[i].y = 0.9*i*Math.cos(appMc.mcMainUIWindRope.points[i].a*toRAD)
		}
		
		//- GAME EFFECT
	
		//- BULLET
		
		for(i=0; i<gameInfo.effBulletsTotal; i++){
			if(appMc["mcBullet"+i].visible){
				
				//- position
				
				appMc["mcBullet"+i].x += appMc["mcBullet"+i].vSpeed*Math.cos(appMc["mcBullet"+i].vAngle);
				appMc["mcBullet"+i].y += appMc["mcBullet"+i].vSpeed*Math.sin(appMc["mcBullet"+i].vAngle);
				
				if(appMc["mcBullet"+i].vAngle>-Math.PI*0.5 && appMc["mcBullet"+i].vAngle<Math.PI*0.5){
					appMc["mcBullet"+i].vAngle += gameInfo.graviryMassK*appMc["mcBullet"+i].mass;	
				}else{
					appMc["mcBullet"+i].vAngle -= gameInfo.graviryMassK*appMc["mcBullet"+i].mass;	
				}
				
				//- add tracer
				
				if(appMc["mcBullet"+i].active){
					AddTracer(appMc["mcBullet"+i].x, appMc["mcBullet"+i].y, Math.atan2((appMc["mcBullet"+i].y-appMc["mcBullet"+i].old_y), (appMc["mcBullet"+i].x-appMc["mcBullet"+i].old_x)));
				}
				
				//- save position
				
				appMc["mcBullet"+i].old_x = appMc["mcBullet"+i].x;
				appMc["mcBullet"+i].old_y = appMc["mcBullet"+i].y;
				
				//- in water
				
				for(j=0; j<gameInfo.totalWP; j++){	
					if(appMc["mcBullet"+i].x > gameInfo.waterPoint[j].x-70 && appMc["mcBullet"+i].x < gameInfo.waterPoint[j].x+70 && appMc["mcBullet"+i].y > gameInfo.waterPoint[j].y){
						if(appMc["mcBullet"+i].active){
							k=j-2;
							if(k>0){ gameInfo.waterPoint[k].dy += 20; }
							k=j-1;
							if(k>0){ gameInfo.waterPoint[k].dy -= 50; }
							
							gameInfo.waterPoint[j].dy += 100;
							
							k=j+1;
							if(k>0){ gameInfo.waterPoint[k].dy -= 50; }
							k=j+2;
							if(k>0){ gameInfo.waterPoint[k].dy += 20; }
							
							AddSpray(appMc["mcBullet"+i].x, gameInfo.waterPoint[j].y);
						}
						
						appMc["mcBullet"+i].active = false;
						appMc["mcBullet"+i].vSpeed = 20;
						appMc["mcBullet"+i].alpha -= 0.04; 
						
						if(appMc["mcBullet"+i].vAngle>-Math.PI*0.5 && appMc["mcBullet"+i].vAngle<Math.PI*0.5){
							appMc["mcBullet"+i].vAngle += 0.03;	
						}else{
							appMc["mcBullet"+i].vAngle -= 0.03;	
						}
						
						if(appMc["mcBullet"+i].alpha<0.05){
							appMc["mcBullet"+i].visible = false;	
						}
					}
				}
				
				//- hit test (ships)
				
				for(j=0; j<2; j++){
					if(j!=appMc["mcBullet"+i].parentId && appMc["mcPlayer"+j].visible){
						for(k=0; k<ShipInfo[gameInfo["player"+j].shipId].rect.length; k++){
							appMc["mcPlayer"+j]._cRx0 = Math.min((appMc["mcPlayer"+j].x+appMc["mcPlayer"+j].scale.x*(ShipInfo[gameInfo["player"+j].shipId].rect[k].x)), (appMc["mcPlayer"+j].x+appMc["mcPlayer"+j].scale.x*(ShipInfo[gameInfo["player"+j].shipId].rect[k].x+ShipInfo[gameInfo["player"+j].shipId].rect[k].width)));
							appMc["mcPlayer"+j]._cRx1 = Math.max((appMc["mcPlayer"+j].x+appMc["mcPlayer"+j].scale.x*(ShipInfo[gameInfo["player"+j].shipId].rect[k].x)), (appMc["mcPlayer"+j].x+appMc["mcPlayer"+j].scale.x*(ShipInfo[gameInfo["player"+j].shipId].rect[k].x+ShipInfo[gameInfo["player"+j].shipId].rect[k].width)));
							appMc["mcPlayer"+j]._cRy0 = Math.min((appMc["mcPlayer"+j].y+appMc["mcPlayer"+j].scale.y*(ShipInfo[gameInfo["player"+j].shipId].rect[k].y)), (appMc["mcPlayer"+j].y+appMc["mcPlayer"+j].scale.y*(ShipInfo[gameInfo["player"+j].shipId].rect[k].y+ShipInfo[gameInfo["player"+j].shipId].rect[k].height)));
							appMc["mcPlayer"+j]._cRy1 = Math.max((appMc["mcPlayer"+j].y+appMc["mcPlayer"+j].scale.y*(ShipInfo[gameInfo["player"+j].shipId].rect[k].y)), (appMc["mcPlayer"+j].y+appMc["mcPlayer"+j].scale.y*(ShipInfo[gameInfo["player"+j].shipId].rect[k].y+ShipInfo[gameInfo["player"+j].shipId].rect[k].height)));
							
							if(appMc["mcBullet"+i].x > appMc["mcPlayer"+j]._cRx0 && appMc["mcBullet"+i].x < appMc["mcPlayer"+j]._cRx1){									
								if(appMc["mcBullet"+i].y > appMc["mcPlayer"+j]._cRy0 && appMc["mcBullet"+i].y < appMc["mcPlayer"+j]._cRy1){
									appMc["mcPlayer"+j].visible = false;
									appMc["mcBullet"+i].visible = false;
									
									//-
								
									k=appMc["mcPlayer"+j]._minXid-2;
									if(k>0){ gameInfo.waterPoint[k].dy += 30; }
									k=appMc["mcPlayer"+j]._minXid-1;
									if(k>0){ gameInfo.waterPoint[k].dy -= 70; }
									
									gameInfo.waterPoint[appMc["mcPlayer"+j]._minXid].dy += 100;
									
									k=appMc["mcPlayer"+j]._minXid+1;
									if(k>0){ gameInfo.waterPoint[k].dy -= 70; }
									k=appMc["mcPlayer"+j]._minXid+2;
									if(k>0){ gameInfo.waterPoint[k].dy += 30; }
									
									AddSpray(appMc["mcBullet"+i].x, gameInfo.waterPoint[j].y);
								
									//-
									
									AddSmoke(appMc["mcPlayer"+j].x, appMc["mcPlayer"+j].y, appMc["mcPlayer"+j].width, appMc["mcPlayer"+j].height*0.7, ShipInfo[gameInfo["player"+j].shipId].nSmoke);
									AddShipCrash(appMc["mcPlayer"+j].x, appMc["mcPlayer"+j].y, appMc["mcPlayer"+j].width, appMc["mcPlayer"+j].height*0.5, ShipInfo[gameInfo["player"+j].shipId].nCrash);
									
									//-
									
									EndGame();
									
									//-
									
									break;
								}
							}
						}
					}					
				}					
			}
		}
		
		//- SPRAY
					
		for(i=0; i<gameInfo.effSprayTotal; i++){
			if(appMc["mcSpray"+i].visible){
				appMc["mcSpray"+i].y += appMc["mcSpray"+i].vy;
				
				appMc["mcSpray"+i].vy += 1.0;
				
				appMc["mcSpray"+i].alpha -= 0.02;
				appMc["mcSpray"+i].scale.x -= 0.01;
				
				if(appMc["mcSpray"+i].y>gameInfo.seaLevel){
					appMc["mcSpray"+i].alpha -= 0.02;
				}
				
				if(appMc["mcSpray"+i].scale.x < 0.05 || appMc["mcSpray"+i].alpha<0.05){
					appMc["mcSpray"+i].visible = false;	
				}
			}
		}
		
		//- TRACER
		
		for(i=0; i<gameInfo.effTracerTotal; i++){
			if(appMc["mcTracer"+i].visible){
				appMc["mcTracer"+i].scale.x -= 0.04;
				appMc["mcTracer"+i].scale.y = 0.2*appMc["mcTracer"+i].scale.x;
				
				if(appMc["mcTracer"+i].alpha<1){
					appMc["mcTracer"+i].alpha += 0.1;	
				}
				
				if(appMc["mcTracer"+i].scale.x < 0.05){
					appMc["mcTracer"+i].visible = false;	
				}
			}
		}
		
		//- SMOKE
		
		for(i=0; i<gameInfo.effSmokeTotal; i++){
			if(appMc["mcSmoke"+i].visible){
				appMc["mcSmoke"+i].rotation += appMc["mcSmoke"+i].vr;
				appMc["mcSmoke"+i].scale.x += appMc["mcSmoke"+i].vs;
				appMc["mcSmoke"+i].scale.y = appMc["mcSmoke"+i].scale.x;
				if(appMc["mcSmoke"+i].scale.x<0.5){
					appMc["mcSmoke"+i].scale.x += appMc["mcSmoke"+i].vs;
					appMc["mcSmoke"+i].scale.y = appMc["mcSmoke"+i].scale.x;
				}
				
				appMc["mcSmoke"+i].alpha -= appMc["mcSmoke"+i].va;
				if(appMc["mcSmoke"+i].alpha<0.05){
					appMc["mcSmoke"+i].visible = false;	
				}
			}
		}
		
		//- CRASH SHIPS
		
		for(i=0; i<gameInfo.effShipCrashTotal; i++){
			if(appMc["mcShipCrash"+i].visible){
				appMc["mcShipCrash"+i].x += appMc["mcShipCrash"+i].vx;
				appMc["mcShipCrash"+i].y += appMc["mcShipCrash"+i].vy;
				appMc["mcShipCrash"+i].rotation += appMc["mcShipCrash"+i].vr;
				
				appMc["mcShipCrash"+i].vx *= 0.98;
				appMc["mcShipCrash"+i].vy += 1.0;
				
				for(j=0; j<gameInfo.totalWP; j++){	
					if(appMc["mcShipCrash"+i].x > gameInfo.waterPoint[j].x-70 && appMc["mcShipCrash"+i].x < gameInfo.waterPoint[j].x+70 && appMc["mcShipCrash"+i].y > gameInfo.waterPoint[j].y){
						appMc["mcShipCrash"+i].vy = 2;
						appMc["mcShipCrash"+i].vr *= 0.9;
						appMc["mcShipCrash"+i].alpha -= 0.02;
						if(appMc["mcShipCrash"+i].alpha<0.05){
							appMc["mcShipCrash"+i].visible = false;	
						}
					}
				}
			}		
		}
		
		//- GAME LAYER

		appMc.mcGameContentLayer1.y = gameInfo.worldScaleToY*appMc.mcGameContentLayer1.scale.y;
				
		//- PIXI RENDER
		
		appObj.tmFPS=0;
		renderer.render(stage);     
		
	}

	//- RAF
	window.requestAnimationFrame(StageEF);
}