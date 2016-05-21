import {connect} from 'react-redux';
import Property from "../components/Property.jsx";
import {saveSvgProperties, saveElementProperties, addMeasurePoint,removeMeasurePoint,saveMeasurePointValue, updateElementGeometricData,updateLines,updateTextElement,savePageInfo} from "../actions";
import {CANVAS,COMMON_ELEMENT} from "../consts";
import {ElementHelper} from "../Utility";
import {DataHelper} from "../Util/DataHelper";

function _getElementType(event){
    return event.target.getAttribute("data-element-type-id");
}
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
function _getPageInfoByEvent(event){
    var containerElement = event.currentTarget.parentElement.parentElement;
    var pageNameEle = containerElement.querySelector("input[name=pageName]");
    var pageIdEle = containerElement.querySelector("input[name=pageId]");
    var bindingId;
    if(pageIdEle){
	bindingId = pageIdEle.value;
    }
    return {
	pageName: pageNameEle.value,
	bindingId: bindingId
    };
}

function _getGeometricDataByEvent(event){
    var containerElement = event.currentTarget.parentElement.parentElement;
    var geometricElement = containerElement.querySelector("div.pro-geo-data");
    var key = event.currentTarget.getAttribute("data-key");
    var geometricData = {
	id: key,
	width: parseInt(geometricElement.querySelector("input[name=width]").value),
	height: parseInt( geometricElement.querySelector("input[name=height]").value),
	x: parseInt(geometricElement.querySelector("input[name=xAxies]").value),
	y: parseInt(geometricElement.querySelector("input[name=yAxies]").value)
    };

    return geometricData;
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

function _getTextElementPropertiesByEvent(event){
    let key,text;
    var containerElement = event.target.parentElement.parentElement;
    var textElement = containerElement.querySelector("input[name=text]");
    text = textElement.value;
    key = textElement.getAttribute("data-element-key");
    return {key,text};
}
function _getGroupElementPropertiesByEvent(event){
    let key,bindingId;
    var containerElement = event.target.parentElement.parentElement;
    var textElement = containerElement.querySelector("input[name=binding-id]");
    bindingId = textElement.value;
    key = textElement.getAttribute("data-element-key");
    return {key,bindingId};
}
function _getPlaceholderElementPropertiesByEvent(event){
    let key, bindingId;
    var containerElement = event.target.parentElement.parentElement;
    var textElement = containerElement.querySelector("input[name=binding-id]");
    bindingId = textElement.value;
    key = textElement.getAttribute("data-element-key");
    return {key,bindingId};
}

function getElementGeometricDataByEvent(event){
    var containerElement = event.currentTarget.parentElement.parentElement.parentElement;
    var propertyElement = containerElement.querySelector("div.pro-deviceInfo");
    var geometricElement = containerElement.querySelector("div.pro-geo-data");
     return {
	 id: propertyElement.getAttribute("data-element-key"),
	width: parseInt(geometricElement.querySelector("input[name=width]").value),
	height: parseInt( geometricElement.querySelector("input[name=height]").value),
	x: parseInt(geometricElement.querySelector("input[name=xAxies]").value),
	y: parseInt(geometricElement.querySelector("input[name=yAxies]").value)
    };
}

const mapStateToProps = (state) => {
    let properties = state.properties;
    let paperInfo = DataHelper.getPaperInfo(state.selectedPaperId);
    //todo:: why svgProperties can not synced automaticlly
    if(properties.type === CANVAS ) {
	return Object.assign({},state.properties,{selectedProperties: state.svgProperties},{
	    paperInfo: paperInfo
	});
    }
    return Object.assign({},state.properties);
};
const mapDispatchtoProps = (dispatch) => {
    return {
	onSave: (event) => {
	    //todo:: collect all properties
	    //1. for canvas - width, height gridsize
	    //2. for element - width,height/id/name/binding info
	    let type = event.currentTarget.getAttribute("data-selected-type");
	    switch(type) {
	    case CANVAS:
		//collect svg properties
		var {width,height,gridSize} = _getSVGPropertiesByEvent(event);
		var {pageName,bindingId} = _getPageInfoByEvent(event);
		dispatch(saveSvgProperties(width,height,gridSize));
		dispatch(savePageInfo(pageName,bindingId));
		break;
	    case COMMON_ELEMENT:
		//collect element properties
		var elementType = _getElementType(event);
		var geometricData = _getGeometricDataByEvent(event);
		var elementProperties;
		if(ElementHelper.isText(elementType)){
		    elementProperties = _getTextElementPropertiesByEvent(event);
		    dispatch(updateTextElement(elementProperties.key,elementProperties.text));
		} else if(ElementHelper.isGroup(elementType)){
		    elementProperties = _getGroupElementPropertiesByEvent(event);
		} else if(ElementHelper.isPlaceHolder(elementType)){
		    elementProperties = _getPlaceholderElementPropertiesByEvent(event);
		} else{
		    elementProperties = _getCommonElementPropertiesByEvent(event);
		    setTimeout(()=>{
			dispatch(updateLines(geometricData.id));
		    },100);
		}
		elementProperties.elementTypeId = elementType;
		 dispatch(saveElementProperties(Object.assign(elementProperties,{geometricData: geometricData})));
		 dispatch(updateElementGeometricData(geometricData.id,geometricData.width,geometricData.height,geometricData.x,geometricData.y));
		break;
	    }
	},
	/**
	 * todo:: update the Geometric data only
	 * @param {} evt
	 */
	onGeometricDataChange: (evt) => {
	    var geometricData = getElementGeometricDataByEvent(evt);
	    dispatch(updateElementGeometricData(geometricData.id,geometricData.width,geometricData.height,geometricData.x,geometricData.y));
		setTimeout(()=>{
		    dispatch(updateLines(geometricData.id));
		},100);
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

