import {generateUUID, StoreHelper, DefaultValues,ApiSingletone} from "../Utility";
import {
    ADD_MEASURE_POINT,
    REMOVE_MEASURE_POINT,
    SELECT_ELEMENT,
    SELECT_CANVAS,
    CANVAS,
    COMMON_ELEMENT,
    SAVE_ELEMENT_PROPERTIES,
    SAVE_MEASURE_POINT_VALUE,
    UPDATE_GEOMETRIC_DATA,
    MOVE_ELEMENT,
    SWITCH_SUB_PAPER
} from "../consts";

//{selectedProperties:{},properties:{}}
const properties = (state={type:CANVAS,selectedProperties:ApiSingletone.svgProperties,properties:ApiSingletone.properties},action) => {
    let selectedProperties = null;
    let geometricData = {};
    switch(action.type){
    case MOVE_ELEMENT:
	if(state.selectedProperties.key === action.id) {
	    selectedProperties = state.selectedProperties;
	    geometricData = Object.assign({},selectedProperties.geometricData,{
		x: action.x,
		y: action.y
	    });
	    selectedProperties = Object.assign({},state.selectedProperties,{
		geometricData: geometricData
	    });
	    return Object.assign({},state,{selectedProperties: selectedProperties});
	}
	return state;
	break;
    case SELECT_CANVAS:
	selectedProperties = {
	    width: action.width,
	    height: action.height,
	    gridSize: action.gridSize
	};
	return Object.assign({},state,{selectedProperties,type:CANVAS});
	break;
    case SELECT_ELEMENT:
	selectedProperties = state.properties[action.id];
	let selectedElement = StoreHelper.getCanvasElmentInfoById(action.id);
	geometricData = {
	    width: selectedElement.width,
	    height: selectedElement.height,
	    x: selectedElement.x,
	    y: selectedElement.y
	};
	if(selectedProperties) {
	    selectedProperties = Object.assign({},StoreHelper.getElementProperties(action.id),{
		geometricData: geometricData
	    });
	} else {
	    selectedProperties = Object.assign({},StoreHelper.getElementProperties(action.id),{
		key: action.id,
		geometricData: geometricData
	    });
	}
	return Object.assign({},state,{selectedProperties,type: COMMON_ELEMENT});
	break;
    case UPDATE_GEOMETRIC_DATA:
	selectedProperties = state.properties[action.id];
	geometricData = Object.assign({},state.selectedProperties.geometricData,{
	    width: action.width,
	    height: action.height,
	    x: action.x,
	    y: action.y
	});
	selectedProperties = Object.assign({},state.selectedProperties,{
	    geometricData: geometricData
	});
	return Object.assign({},state,{selectedProperties:selectedProperties});
	break;
    case ADD_MEASURE_POINT:
	selectedProperties = state.selectedProperties;
	let measurePointInfos = selectedProperties.measurePointInfos;
	selectedProperties = Object.assign({},selectedProperties,{
	    measurePointInfos: [ DefaultValues.getMeasurePointInfo(), ...measurePointInfos]
	});
	return Object.assign({},state,{selectedProperties});
	break;
    case REMOVE_MEASURE_POINT:
	selectedProperties = state.selectedProperties;
	measurePointInfos = selectedProperties.measurePointInfos;
	selectedProperties = Object.assign({},selectedProperties,{
	    measurePointInfos:[...measurePointInfos.slice(0,action.index),...measurePointInfos.slice(action.index+1,measurePointInfos.length)]
	});
	return Object.assign({},state,{selectedProperties});
	break;
    case SAVE_ELEMENT_PROPERTIES:
	let properties = Object.assign({},state.properties,{[action.properties.key]:action.properties});
	return Object.assign({},state,{properties: properties});
	break;
    case SAVE_MEASURE_POINT_VALUE:
	//todo:: update it the state directly with side effect.
	measurePointInfos = state.selectedProperties.measurePointInfos;
	measurePointInfos[action.index][action.key] = action.value;
	return state;
	break;
    case SWITCH_SUB_PAPER:
	return Object.assign({},{type:CANVAS,selectedProperties: action.paper.svgProperties,properties: action.paper.properties});
	break;
    default:
	return state;
	break;
    }
};
export default properties;
