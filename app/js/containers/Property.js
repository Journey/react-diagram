import {connect} from 'react-redux';
import Property from "../components/Property.jsx";
import {saveSvgProperties, saveElementProperties, addMeasurePoint,removeMeasurePoint,saveMeasurePointValue, updateElementGeometricData,updateLines} from "../actions";
import {CANVAS,COMMON_ELEMENT} from "../consts";

function _getSVGPropertiesByEvent(event){
    var containerElement = event.currentTarget.parentElement.parentElement;
    var widthEle = containerElement.querySelector("input[name=width]");
    var heightEle = containerElement.querySelector("input[name=height]");
    var gridSizeEle = containerElement.querySelector("input[name=gridSize]");
    return {
	width: widthEle.value,
	height: heightEle.value,
	gridSize: gridSizeEle.value
    };
}

function _getCommonElementPropertiesByEvent(event){
    var containerElement = event.currentTarget.parentElement.parentElement;
    var propertyElement = containerElement.querySelector("div.pro-deviceInfo");
    var measurePointInfos = containerElement.querySelector("div.measure-info");
    var geometricElement = containerElement.querySelector("div.pro-geo-data");
    var key = propertyElement.getAttribute("data-element-key");
    var measureInfoElements = measurePointInfos.querySelectorAll("div.measure-template");
    var deviceInfo = {
	name: propertyElement.querySelector("input[name=name]").value,
	identifier: propertyElement.querySelector("input[name=identifier]").value
    };
    var measurePointInfoObject = Array.prototype.map.call(measureInfoElements,(infoElement)=>{
	let name = infoElement.querySelector("input[name=name]").value;
	let identifier = infoElement.querySelector("input[name=identifier]").value;
	let type = infoElement.querySelector("select").value;
	return {name,identifier,type};
    });
    var geometricData = {
	id: key,
	width: parseInt(geometricElement.querySelector("input[name=width]").value),
	height: parseInt( geometricElement.querySelector("input[name=height]").value),
	x: parseInt(geometricElement.querySelector("input[name=xAxies]").value),
	y: parseInt(geometricElement.querySelector("input[name=yAxies]").value)
    };
    return {key,deviceInfo,measurePointInfos:measurePointInfoObject,geometricData:geometricData};
}

/**
 * todo:: get geometrict data only
 * @param {} evt
 */
function _getGeometricDataByEvent(evt) {
    
};

const mapStateToProps = (state) => {
    let properties = state.properties;
    if(properties.type === CANVAS ) {
	return Object.assign({},state.properties,{
	    selectedProperties: state.svgProperties
	});
    }
    return Object.assign({},state.properties);
};
const mapDispatchtoProps = (dispatch) => {
    return {
	onSave: (evt) => {
	    //todo:: collect all properties
	    //1. for canvas - width, height gridsize
	    //2. for element - width,height/id/name/binding info
	    let type = evt.currentTarget.getAttribute("data-selected-type");
	    switch(type) {
	    case CANVAS:
		//collect svg properties
		var {width,height,gridSize} = _getSVGPropertiesByEvent(evt);
		dispatch(saveSvgProperties(width,height,gridSize));
		break;
	    case COMMON_ELEMENT:
		//collect element properties
		var elementProperties = _getCommonElementPropertiesByEvent(evt);
		var geometricData = elementProperties.geometricData;
		dispatch(saveElementProperties(elementProperties));
		dispatch(updateElementGeometricData(geometricData.id,geometricData.width,geometricData.height,geometricData.x,geometricData.y));
		setTimeout(()=>{
		    dispatch(updateLines(geometricData.id));
		},100);
		break;
	    }
	},
	/**
	 * todo:: update the Geometric data only
	 * @param {} evt
	 */
	onGeometricDataChange: (evt) => {
	    
	},
	onAddMeasurePoint: () => {
	    dispatch(addMeasurePoint());
	},
	onRemoveMeasurePoint: (event) => {
	    //todo:: get the index of the measure
	    let index = event.currentTarget.getAttribute("data-index");
	    dispatch(removeMeasurePoint(index));
	},
	onMeasurePointValueChange: (event) => {
	    let target = event.currentTarget;
	    let index = target.getAttribute("data-index");
	    let key = target.getAttribute("name");
	    let value = target.value;
	    dispatch(saveMeasurePointValue(index,key,value));
	}
    };
};

export default connect(
    mapStateToProps,
    mapDispatchtoProps
)(Property);

