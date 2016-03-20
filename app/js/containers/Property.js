import {connect} from 'react-redux';
import Property from "../components/Property.jsx";
import {saveSvgProperties, saveElementProperties, addMeasurePoint,removeMeasurePoint} from "../actions";
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
    return {key,deviceInfo,measurePointInfos:measurePointInfoObject};
}

const mapStateToProps = (state) => {
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
		console.log(elementProperties);
		dispatch(saveElementProperties(elementProperties));
		break;
	    }
	},
	onAddMeasurePoint: () => {
	    dispatch(addMeasurePoint());
	},
	onRemoveMeasurePoint: (event) => {
	    //todo:: get the index of the measure
	    let index = event.currentTarget.getAttribute("data-index");
	    dispatch(removeMeasurePoint(index));
	}
    };
};

export default connect(
    mapStateToProps,
    mapDispatchtoProps
)(Property);

