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
    }
};

