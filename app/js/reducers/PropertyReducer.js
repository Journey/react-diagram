import {generateUUID, StoreHelper} from "../Utility";
import {
    ADD_MEASURE_POINT,
    REMOVE_MEASURE_POINT,
    SELECT_ELEMENT,
    SELECT_CANVAS,
    CANVAS,
    COMMON_ELEMENT,
    SAVE_ELEMENT_PROPERTIES,
    SAVE_MEASURE_POINT_VALUE
} from "../consts";

const _getDefaultDeviceInfo = () =>{
    return {
	name:"",
	serialNumber:""
    };
};

const _getDefaultMeasurePointInfo = () => {
    return {
	    name:"",
	    identifier:"",
	    type:"1"
    };
};

//{selectedProperties:{},properties:{}}
const properties = (state={type:CANVAS,selectedProperties:{},properties:{}},action) => {
    let selectedProperties = null;
    switch(action.type){
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
	if(selectedProperties) {
	    let newDeviceInfo = Object.assign(selectedProperties.deviceInfo);
	    let newMeasurePointInfos = selectedProperties.measurePointInfos.map((info)=>{
		return Object.assign({},info);
	    });
	    selectedProperties = {
		key: action.id,
		deviceInfo: newDeviceInfo,
		measurePointInfos: newMeasurePointInfos
	    };
	} else {
	    selectedProperties = {
		key: action.id,
		deviceInfo: _getDefaultDeviceInfo(),
		measurePointInfos: [_getDefaultMeasurePointInfo()]
	    };
	}
	return Object.assign({},state,{selectedProperties,type: COMMON_ELEMENT});
	break;
    case ADD_MEASURE_POINT:
	selectedProperties = state.selectedProperties;
	let measurePointInfos = selectedProperties.measurePointInfos;
	selectedProperties = Object.assign({},selectedProperties,{
	    measurePointInfos: [ _getDefaultMeasurePointInfo(), ...measurePointInfos]
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
    default:
	return state;
	break;
    }
};
export default properties;
