import {combineReducers} from "redux";
import {
    UPDATE_SVG_PROPERTIES,
    ADD_ELEMENT,
    REMOVE_ELEMENT,
    MOVE_ELEMENT,
    ADD_LINE,
    UPDATE_LINES,
    SAVE_SVG_PROPERTIES
} from "../consts";
import {generateUUID, StoreHelper, LineHelper} from "../Utility";
let _defaultProperties = {
    width: 700,
    height: 700,
    gridSize: 20
};
/**
 * The States for the whole canvas
 * @param {} _defaultProperties
 * @param {} action
 * @returns {} 
 */
const svgProperties = (state=_defaultProperties, action) => {
    var newState;
    switch(action.type){
    case SAVE_SVG_PROPERTIES:
	newState = Object.assign({},state,{
	    width: action.width,
	    height: action.height,
	    gridSize: action.gridSize
	});
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
const elements = (state={},action) => {
    let newState;
    switch(action.type){
    case ADD_ELEMENT:
	let key = generateUUID();
	let element = StoreHelper.getPalletElementInfoById(action.id);
	let newElement = Object.assign({}, element, {key:key,x:action.x,y:action.y});
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
	newState = state;
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
const links = (state={},action) => {
    switch(action.type){
    case UPDATE_LINES:
	//todo update lines which related to the element
	let aRefLinks = StoreHelper.getRefLinksByElementKey(action.id);
	let oUpdatedLinks = StoreHelper.getUpdatedLinks(aRefLinks);
	return Object.assign({},state, oUpdatedLinks);
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
    }
    return state;
};
export {svgProperties, elements, links};
