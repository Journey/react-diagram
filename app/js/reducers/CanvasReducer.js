import {combineReducers} from "redux";
import {
    UPDATE_SVG_PROPERTIES,
    ADD_ELEMENT,
    REMOVE_ELEMENT,
    REMOVE_LINES,
    REMOVE_LINE,
    MOVE_ELEMENT,
    ADD_LINE,
    UPDATE_LINES,
    SAVE_SVG_PROPERTIES,
    SELECT_CANVAS,
    SELECT_ELEMENT,
    SELECT_LINE,
    ZOOM_IN,
    ZOOM_OUT,
    REDO_OPERATION,
    UNDO_OPERATION,
    CREATE_SUB_PAPGER,
    DELETE_SUB_PAPGER,
    UPDATE_GEOMETRIC_DATA,
    SWITCH_SUB_PAPER,
    SAVE_ELEMENT_PROPERTIES,
    UPDATE_TEXT_ELEMENT
} from "../consts";
import {generateUUID, StoreHelper, LineHelper,DefaultValues,ApiSingletone} from "../Utility";

/**
 * The States for the whole canvas
 * @param {} _defaultProperties
 * @param {} action
 * @returns {} 
 */
const svgProperties = (state=ApiSingletone.svgProperties, action) => {
    var newState;
    let _origZoomLevel = state.zoomLevel;
    let _newZoomLevel;
    switch(action.type){
    case ZOOM_IN:
	_newZoomLevel = _origZoomLevel + 0.2;
	newState = Object.assign({},state, {
	    width: state.width/_origZoomLevel * _newZoomLevel,
	    height: state.height/_origZoomLevel * _newZoomLevel,
	    scaleX: _newZoomLevel,
	    scaleY: _newZoomLevel,
	    zoomLevel: _newZoomLevel
	});
	break;
    case ZOOM_OUT:
	_newZoomLevel = _origZoomLevel - 0.2;
	if(_newZoomLevel <= 0){
	    _newZoomLevel = 0.2;
	}
	newState = Object.assign({},state, {
	    width: state.width/_origZoomLevel * _newZoomLevel,
	    height: state.height/_origZoomLevel * _newZoomLevel,
	    scaleX: _newZoomLevel,
	    scaleY: _newZoomLevel,
	    zoomLevel: _newZoomLevel
	});
	break;
    case SAVE_SVG_PROPERTIES:
	newState = Object.assign({},state,{
	    width: action.width,
	    height: action.height,
	    gridSize: action.gridSize
	});
	break;
    case SWITCH_SUB_PAPER:
	newState = Object.assign({},action.paper.svgProperties);
	break;
    default:
	newState = state;
    }
    return newState;
};
/**
 * the elements of the canvas
 * @param {} state
 * @param {} action
 * @returns {} 
 */
const elements = (state=ApiSingletone.elements,action) => {
    let newState,newElement;
    switch(action.type){
    case UPDATE_GEOMETRIC_DATA: //save geometric data to elements
	let key = action.id;
	newElement = Object.assign({},state[key],{
	    width: action.width,
	    height: action.height,
	    x: action.x,
	    y: action.y
	});
	newState = Object.assign({},state,{[key]:newElement});
	break;
    case ADD_ELEMENT:
	key = generateUUID();
	let element = StoreHelper.getPalletElementInfoById(action.id);
	newElement = Object.assign({}, element, {key:key,x:action.x,y:action.y});
	newState = Object.assign({},state);
	newState[key] = newElement;
	break;
    case MOVE_ELEMENT:
	let currentElement = state[action.id];
	let updatedElement = Object.assign({},currentElement,{
	    x: action.x,
	    y: action.y
	});
	let wrapElement = {
	    [action.id]: updatedElement
	};
	newState = Object.assign({},state,wrapElement);
	break;
    case REMOVE_ELEMENT:
	newState = Object.assign({},state);
	delete newState[action.id];
	break;
    case SWITCH_SUB_PAPER:
	newState = Object.assign({},action.paper.elements);
	break;
    case UPDATE_TEXT_ELEMENT:
	let textElement = Object.assign({},state[action.elementId],{text: action.text});
	newState = Object.assign({},state,{
	    [textElement.key]: textElement
	});
	break;
    default:
	newState = state;
    }
    return newState;
};
/**
 * the links which connected the elements
 * @param {} state
 * @param {} action
 * @returns {} 
 */
const links = (state=ApiSingletone.links,action) => {
    switch(action.type){
    case UPDATE_LINES:
	//todo update lines which related to the element
	let aRefLinks = StoreHelper.getRefLinksByElementKey(action.id);
	let oUpdatedLinks = StoreHelper.getUpdatedLinks(aRefLinks);
	return Object.assign({},state, oUpdatedLinks);
	break;
    case REMOVE_LINES:
	aRefLinks = StoreHelper.getRefLinksByElementKey(action.id);
	let newLinks = Object.assign({},state);
	aRefLinks.forEach((key)=>{
	    delete newLinks[key]; 
	});
	return newLinks;
	break;
    case REMOVE_LINE:
	newLinks = Object.assign({},state);
	delete newLinks[action.id];
	return newLinks;
	break;
    case ADD_LINE:
	let key = generateUUID();
	var startPoint = StoreHelper.getPortPosition(action.startPort.elementKey,action.startPort.position);
	var endPoint = StoreHelper.getPortPosition(action.endPort.elementKey,action.endPort.position);
	var path = LineHelper.getPath(startPoint,endPoint);
	return Object.assign({},state, {
	    [key]:{
		key: key,
		startPort: action.startPort,
		endPort: action.endPort,
		path: path
	    }
	});
	break;
    case SWITCH_SUB_PAPER:
	return  Object.assign({},action.paper.links);
	break;
    }
    return state;
};
const operator = (state=DefaultValues.getOperator(),action) => {
    switch(action.type){
    case MOVE_ELEMENT:
	if(state.id === action.id){
	    return Object.assign({},state,{
		x: action.x,
		y: action.y
	    });
	}
	return state;
	break;
    case REMOVE_ELEMENT:
    case SELECT_CANVAS:
	return DefaultValues.getOperator();
	break;
    case SELECT_ELEMENT:
    case UPDATE_GEOMETRIC_DATA:
	return {
	    id: action.id,
	    x: action.x,
	    y: action.y,
	    width: action.width,
	    height: action.height
	};
	break;
    case SELECT_LINE:
	return Object.assign({},state,{lineId: action.id});
	break;
    case SWITCH_SUB_PAPER:
	return Object.assign({},action.paper.operator);
	break;
    default:
	return state;
    }
};
export {svgProperties, elements, links, operator};
