/**
 * @Define PaperHeler Used to provide some helper method for update the binding data of the paper
 * @name PaperHeler.js
 * @author journey
 * @license BSD
 */
import {
    StoreHelper
} from "./StoreHelper";
import {ElementHelper} from "./ElementHelper";
function _updatePlaceholdersValues(elements,properties,oValues){
    return Object.keys(elements).filter((sEleKey)=>{
	if(ElementHelper.isPlaceHolder(elements[sEleKey].id)){
	    return true;
	}
	return false;
    }).reduce((oPre,sEleKey)=>{
	var property = properties[sEleKey];
	var bindingid = property["bindingId"];
	if(oValues[bindingid]){
	    oPre[property.key] = Object.assign({},elements[sEleKey],{text:oValues[bindingid].join(",")});
	}
	return oPre;
    },{});
}
function _updateElementsStatus(elements,properties,oValues){
    return {};
}
export const updatePlaceholderValues = (oValues) => {
    var elements = StoreHelper.getElements();
    var properties = StoreHelper.getProperties();
    return _updatePlaceholdersValues(elements,properties.properties,oValues);
};
export const updateElementsStatus = (oStatus) => {
    var elements = StoreHelper.getElements();
    var properties = StoreHelper.getProperties();
    return _updateElementsStatus(elements,properties,oStatus);
};
/**
 * helper method for the papers(collection of paper object) object
 */
export const papers = {
	/**
	 * update the place holder values of the papers. as the papers is not display directly so update it directly
	 * @param {} oValues
	 */
	updatePlaceholderValues(oValues){
	    var oPapers = StoreHelper.getPapers();
	    Object.keys(oPapers)
		.forEach((paperKey)=>{
		    var paper = oPapers[paperKey];
		    var updatedPlaceholders = _updatePlaceholdersValues(paper.elements,paper.properties,oValues);
		    paper.elements = Object.assign({},paper.elements,updatedPlaceholders);
		});
	    return oPapers;
	},
    /**
     * 
     * @param {Object} oValues the values which represent element status
     * @returns {Object}  oPapers The papers with new status
     */
    updateElementsStatus(oValues){
	var oPapers = StoreHelper.getPapers();
	Object.keys(oPapers)
	    .forEach((paperKey)=>{
		var paper = oPapers[paperKey];
		var updatedElements = _updateElementsStatus(paper.elements,paper.properties);
		papers.elements = Object.assign({},paper.elements,updatedElements);
	    });
	return oPapers;
    },
    /**
     * validate papers. to check whether the subpage binding is correctly set for now. need add more if needed
     */
    validateData(){
	//todo
	var invalideMessages = [];
	var oPapers = StoreHelper.getPapers();
	var subPages = Object.keys(oPapers)
	    .reduce((pre,curPaperKey) => {
		var curPaper = oPapers[curPaperKey];
		if(paper.isSubPage(curPaper.paperType)){
		    pre[curPaperKey] = curPaper.key;
		}
		return pre;
	    },{});

	var isValide = !subPages ||  Object.keys(subPages)
		.every((subPaperUUID)=>{
		    var hasPaper = Object.keys(oPapers).find((paperKey)=>{
			var curPaper = oPapers[paperKey];
			if(paper.isSubPage(curPaper)){
			    return false;
			}
			if(paper.hasDeviceNumber(curPaper, subPages[subPaperUUID])){
			    return true;
			}
			return false;
		    });
		    if(hasPaper){
			return true;
		    } else {
			invalideMessages.push(`子页面${oPapers[subPaperUUID].paperName}绑定id:${subPages[subPaperUUID]} 不存在`);
			return false;
		    }
		});
	return {
	    isValide: !!isValide,
	    messages: invalideMessages
	};
    }
};

export const paper = {
    isSubPage(paper){
	var iPaperTypeId;
	if( parseInt(paper)){ //the param is paperId
	    iPaperTypeId = paper;
	} else {//is paper object
	    iPaperTypeId = paper.paperType;
	}
	iPaperTypeId = parseInt(iPaperTypeId);
	if(iPaperTypeId === 2){
	    return true;
	}
	return false;
    },
    hasDeviceNumber(paper, deviceNumber){
	var properties = paper.properties;
	return Object.keys(properties)
	    .find((uuid)=>{
		var property = properties[uuid];
		var curDeviceNumber = ElementHelper.getDeviceNumber(property);
		if(deviceNumber && curDeviceNumber === deviceNumber){
		    return true;
		}
		return false;
	    });
    }
};
