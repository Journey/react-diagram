const PREFIX_REPOSITION = "REPOSITION::";
var Utility = {
    prefixReposition: function(sText){
	return `${PREFIX_REPOSITION}${sText}`;
    },
    isReposition: function(sText){
	return sText.startsWith(PREFIX_REPOSITION);
    },
    getKeyFromReposition: function(sText){
	return sText.substr(PREFIX_REPOSITION.length);
    },
    generateUUID: (function(){
	var uuidTemplate = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
	return () =>{
	    var r = crypto.getRandomValues(new Uint8Array(1))[0] % 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
	};
    })()
};
function assertNumber(value,key){

};
function assertNull(){
  
};
function assertUndefined(){
  
};

function toJSON(){
  
}
function prefixReposition(sText){
    
}
function isRepositon(sText){
    if(sText.startsWith(PREFIX_REPOSITION)){
	return true;
    }
    return false;
}
export {Utility};

