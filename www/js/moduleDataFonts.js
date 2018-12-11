
var CompleteLoadFontsFun;
var idLoadFonts=0;

var aLoadFonts=[
	{name:"Coiny-Regular", 	path:"fonts/Coiny-Regular.ttf"}
];

function LoadFonts(_funComplete){
	CompleteLoadFontsFun=_funComplete;
	LoadFontId();
}
function LoadFontId(){
	if(idLoadFonts<aLoadFonts.length){
		aLoadFonts[idLoadFonts].font = new Font();
		aLoadFonts[idLoadFonts].font.onload = CompleteLoadFontId;
		aLoadFonts[idLoadFonts].font.onerror = ErrorLoadFontId;
		aLoadFonts[idLoadFonts].font.fontFamily = aLoadFonts[idLoadFonts].name;
		aLoadFonts[idLoadFonts].font.src = aLoadFonts[idLoadFonts].path;
		
	}else{
		CompleteLoadFontsFun();
	}
}
function CompleteLoadFontId(){
	idLoadFonts++;
	LoadFontId();
}
function ErrorLoadFontId(_error){
	idLoadFonts++;
	LoadFontId();	
}
