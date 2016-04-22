import {combineReducers} from "redux";
import {
    PALLET_ELEMENT_DRAG_START,
    CANVAS_ELEMENT_SELECT,
    LINE_ELEMENT_SELECT,
    CLEAR_SELECTION,
    CANVAS_ELEMENT_DRAG_START
} from "../consts";
import groups from "./PalletReducer";
import {svgProperties,elements,links,operator} from "./CanvasReducer";
import properties from "./PropertyReducer";
import {papers,selectedPaperId} from "./TabsReducer";

let _defaultSelectedElement = {
    selectedPalletItem: null,
    selectedCanvasItem: null,
    selectedLine: null
};
/**
 * reducers for log the selected elements of the component
 * @param {Object} state
 * @param {Object} action
 * @returns {Object} new state
 */
const selects = (state=_defaultSelectedElement,action) => {
    switch(action.type){
    case PALLET_ELEMENT_DRAG_START:
	return Object.assign({},state,{selectedPalletItem:action.id});
	break;
    case CANVAS_ELEMENT_DRAG_START:
	return Object.assign({},_defaultSelectedElement,{
	    selectedCanvasItem: action.key
	});
	break;
    case CANVAS_ELEMENT_SELECT:
	return Object.assign({},state,{selectedCanvasItem:action.id});
	break;
    case LINE_ELEMENT_SELECT:
	return Object.assign({},state,{selectedLine:action.id});
	break;
    case CLEAR_SELECTION:
	return _defaultSelectedElement;
	break;
    default:
	return state;
    }
};

const componentReducers = combineReducers({
    selects,
    svgProperties,
    groups,
    elements,
    links,
    properties,
    operator,
    papers,
    selectedPaperId
});
export default componentReducers;
