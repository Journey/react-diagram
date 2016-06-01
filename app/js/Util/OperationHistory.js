import {StoreHelper} from "./StoreHelper";
import {UNDO_REDO_LINKS,UNDO_REDO_ELEMENTS} from "../consts";
/**
 * undo history: {paperid:[{type:"",data:[]}]}
 */
var _undos = {};
var _redos = {};
var _currentProjectId = null;


function addOperation(type, data, aHistory){
    data = JSON.parse(data);
    aHistory.push({
	type: type,
	data: data
    });
}

export const OperationHistory = {
    clear(){
	_currentProjectId = null;
	_undos = {};
	_redos = {};
    },
    addUndo(paperId, type, data){
	if(!_undos[paperId]){
	    _undos[paperId] = [];
	}
	data = JSON.stringify(data);
	if(data){
	    addOperation(type,data,_undos[paperId]);
	}
    },
    addRedo(paperId, type, data){
	if(!_redos[paperId]){
	    _redos[paperId] = [];
	}
	data = JSON.stringify(data);
	if(data){
	    addOperation(type,data,_redos[paperId]);
	}
    },
    popUndo(paperId){
	if(_undos[paperId] && _undos[paperId].length > 0){
	    return _undos[paperId].pop();
	}
	return null;
    },
    popRedo(paperId){
	if(_redos[paperId] && _redos[paperId].length > 0){
	    return _redos[paperId].pop();
	}
	return null;
    }
};

export const OperationWrapper = {
    addRedoElements(){
	var data = StoreHelper.getElements();
	OperationWrapper.addRedo(UNDO_REDO_ELEMENTS,data);
    },
    addRedoLinks(){
	var data = StoreHelper.getLinks();
	OperationWrapper.addRedo(UNDO_REDO_LINKS, data);
    },
    addRedo(type,data){
	var paperId = StoreHelper.getSelectedPaperId();
	OperationHistory.addRedo(paperId,type,data);
    },
    addUndoElements(){
	var data = StoreHelper.getElements();
	OperationWrapper.addUndo(UNDO_REDO_ELEMENTS, data);
    },
    addUndoLinks(){
	var data = StoreHelper.getLinks();
	OperationHistory.addUndo(UNDO_REDO_LINKS, data);
    },
    addUndo(type,data){
	var paperId = StoreHelper.getSelectedPaperId();
	OperationHistory.addUndo(paperId, type, data);
    },
    popUndo(){
	var paperId = StoreHelper.getSelectedPaperId();
	return OperationHistory.popUndo(paperId);
    },
    popRedo(){
	var paperId = StoreHelper.getSelectedPaperId();
	return OperationHistory.popRedo(paperId);
    },
    reset(){
	OperationHistory.clear();
    }
};
