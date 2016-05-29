//callback function for saveDiagram
var _saveDiagram = null;
var _openNew = null;
export const callbacks = {
    get saveDiagram(){
	return _saveDiagram;
    },
    set saveDiagram(fSave){
	_saveDiagram = fSave;
    },
    clear(){
	_saveDiagram = null;
    },
    get openNew(){
	return _openNew;
    },
    set openNew(fValue){
	_openNew = fValue;
    }
};


