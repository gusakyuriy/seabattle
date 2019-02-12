// -----------------------------------------------------------------------------------
//- Math

var toRAD = Math.PI/180;
var toGRAD = 180/Math.PI;

// -----------------------------------------------------------------------------------
//- trace

function trace(_str){
    console.log(_str);
}

// -----------------------------------------------------------------------------------
// SaveUserInfo

function SaveUserInfo(){
    localStorage.setItem(appObj.sdId, JSON.stringify(appObj.sdInfo));
}

// -----------------------------------------------------------------------------------
//- Date

Date.prototype.getNextWeekMonday = function() {
    var d = new Date(this.getTime());
    var diff = d.getDate() - d.getDay() + 1+7;
    if (d.getDay() == 0){ diff -= 7;}
    return new Date(d.setDate(diff));
};

Date.prototype.getNextWeekTuesday = function() {
    var d = this.getNextWeekMonday();
    return new Date(d.setDate(d.getDate() + 1));
};
Date.prototype.getNextWeekWednesday = function() {
    var d = this.getNextWeekMonday();
    return new Date(d.setDate(d.getDate() + 2));
};
Date.prototype.getNextWeekThursday = function() {
    var d = this.getNextWeekMonday();
    return new Date(d.setDate(d.getDate() + 3));
};
Date.prototype.getNextWeekFriday = function() {
    var d = this.getNextWeekMonday();
    return new Date(d.setDate(d.getDate() + 4));
};
Date.prototype.getNextWeekSaturday = function() {
    var d = this.getNextWeekMonday();
    return new Date(d.setDate(d.getDate() + 5));
};
Date.prototype.getNextWeekSunday = function() {
    var d = this.getNextWeekMonday();
    return new Date(d.setDate(d.getDate() + 6));
};

//- Week ID

Date.prototype.getWeek = function () {
    var target  = new Date(this.valueOf());
    var dayNr   = (this.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    var firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() != 4) {
        target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }
    return 1 + Math.ceil((firstThursday - target) / 604800000);
}

// -----------------------------------------------------------------------------------
//- RequestServer

function RequestServer(_url, _cm, _answerFunc, _errorFunc){
    try{
		jQuery.ajax({
			data	: _cm, 
			type	: 'POST',
			url		: _url,
			success	: _answerFunc,
			error	: _errorFunc
		});
	}catch(e){
		_errorFunc("error", "error");
	}
}

// -----------------------------------------------------------------------------------
//- Debug

var debugInit=false;

function DebugInit(){
    debugInit=true;
    
    jQuery("#AppContainer").append("<div id='debug' style='background:#401739; padding:2px; font-family:sans-serif; font-size:10px; color:#fafafa; display:block; position:absolute; left:80px; top:0px; z-index:9959; width:100%;'></div>");
}
function Debug(_str, _isAppend){
    if(!debugInit){
        DebugInit();
    }
    
    if($("div").is("#debug")){
        if(_isAppend==true){
            jQuery( "#debug" ).append(_str+"<br />");
        }else{
            jQuery( "#debug" ).html(_str+"<br />");
        }
    }
}

// -----------------------------------------------------------------------------------
//- Base64

var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

// -----------------------------------------------------------------------------------
//- NumberCode

function NumberEncode(_n){
    return Math.floor(_n+_n*0.6+3);
}

// -----------------------------------------------------------------------------------
//- Mix Array

function MixArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// PIXI -----------------------------------------------------------------------------------
// PositionObjects

function SavePositionObjects(){
    var curr;
    for(curr in appMc){
        appMc[curr].m_x=appMc[curr].position.x;
        appMc[curr].m_y=appMc[curr].position.y;
        appMc[curr].m_alpha=appMc[curr].alpha;
        appMc[curr].m_visible=appMc[curr].visible;
        appMc[curr].m_rotation=appMc[curr].rotation;
        appMc[curr].m_scaleX=appMc[curr].scale.x;
        appMc[curr].m_scaleY=appMc[curr].scale.y;
    }
}
function RebootPositionObjects(){
    var curr;
    for(curr in appMc){
        if(appMc[curr].noReboot!=true){
            RebootPositionObject(appMc[curr]);
        }        
    }
}
function RebootPositionObject(_obj){
    _obj.position.x=_obj.m_x;
    _obj.position.y=_obj.m_y;
    _obj.alpha=_obj.m_alpha;
    _obj.visible=_obj.m_visible; 
    _obj.rotation=_obj.m_rotation;
    _obj.scale.x=_obj.m_scaleX;
    _obj.scale.y=_obj.m_scaleY;
        
    TweenMax.killTweensOf(_obj);
	TweenMax.killTweensOf(_obj.scale);
	TweenMax.killTweensOf(_obj.skew);
	TweenMax.killTweensOf(_obj.position);
}