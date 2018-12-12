/*
var soundsPath="";
var soundApp={};

var soundPaused=[];

//- TIN
var idSoundJump=0;
var aSoundJump=[0,1,2];
var isSoundSteps=true;
var idSoundSteps=0;
var aSoundSteps=[0,1,2];
var idSoundCollision=0;
var aSoundCollision=[0,1];

//- FLY
var isFlyVoice=true;
var aFlyVoiceLines=[];

//-
soundApp["s_mLevel_0_0"] 	= new Howl({src: [soundsPath+'sounds/mLevel_0.mp3'], 	loop: true});
soundApp["s_mLevel_1_0"] 	= new Howl({src: [soundsPath+'sounds/mLevel_1.mp3'], 	loop: true});
soundApp["s_mLevel_2_0"] 	= new Howl({src: [soundsPath+'sounds/mLevel_2.mp3'], 	loop: true});
soundApp["s_mLevel_2_1"] 	= new Howl({src: [soundsPath+'sounds/mLevel_2_1.mp3'], 	loop: true});
soundApp["s_mLevel_3_0"] 	= new Howl({src: [soundsPath+'sounds/mLevel_3.mp3'], 	loop: true});
soundApp["s_mLevel_3_1"] 	= new Howl({src: [soundsPath+'sounds/mLevel_3_1.mp3'], 	loop: true});
soundApp["s_mLevel_4_0"] 	= new Howl({src: [soundsPath+'sounds/mLevel_4.mp3'], 	loop: true});
soundApp["s_mLevel_5_0"] 	= new Howl({src: [soundsPath+'sounds/mLevel_5_0.mp3'], 	loop: true});
soundApp["s_mLoadScreen"] 	= new Howl({src: [soundsPath+'sounds/mLoadScreen.mp3'], loop: true});

soundApp["s_Died"] 			= new Howl({src: [soundsPath+'sounds/sDied.mp3']});
soundApp["s_Enemy_0"] 		= new Howl({src: [soundsPath+'sounds/sEnemy_0.mp3']});
soundApp["s_Respawn"] 		= new Howl({src: [soundsPath+'sounds/sRespawn.mp3']});
soundApp["s_Jump_0"] 		= new Howl({src: [soundsPath+'sounds/sJump_0.mp3']});
soundApp["s_Jump_1"] 		= new Howl({src: [soundsPath+'sounds/sJump_1.mp3']});
soundApp["s_Jump_2"] 		= new Howl({src: [soundsPath+'sounds/sJump_2.mp3']});
soundApp["s_Steps_0"] 		= new Howl({src: [soundsPath+'sounds/sSteps_0.mp3'], onend:StateSoundSteps});
soundApp["s_Steps_1"] 		= new Howl({src: [soundsPath+'sounds/sSteps_1.mp3'], onend:StateSoundSteps});
soundApp["s_Steps_2"] 		= new Howl({src: [soundsPath+'sounds/sSteps_2.mp3'], onend:StateSoundSteps});
soundApp["s_Collision_0"] 	= new Howl({src: [soundsPath+'sounds/sCollision_0.mp3'], onend:StateSoundSteps});
soundApp["s_Collision_1"] 	= new Howl({src: [soundsPath+'sounds/sCollision_1.mp3'], onend:StateSoundSteps});
soundApp["s_Button"] 		= new Howl({src: [soundsPath+'sounds/sButton.mp3']});
*/

//---------------------------------------------------------------------------------------------
//- AllSoundMute

function AllSoundMute(_mute){
	/*if(_mute==true){
		appObj.sdInfo.isSound=0;
		appMc.mcMenu_BtnSoundBg.texture=InfoTextures["basic"]["basic_btn_sound_no"];
	}else{
		appObj.sdInfo.isSound=1;
		appMc.mcMenu_BtnSoundBg.texture=InfoTextures["basic"]["basic_btn_sound"];
	}
	*/
	Howler.mute(_mute); 
}
