//callback function for saveDiagram
var _saveDiagram = null;
export const callbacks = {
    get saveDiagrams(){
	return _saveDiagram;
    },
    set saveDiagram(fSave){
	_saveDiagram = fSave;
    },
    clear(){
	_saveDiagram = null;
    }
};


