/**
 * @Define PaperHeler Used to provide some helper method for update the binding data of the paper
 * @name PaperHeler.js
 * @author journey
 * @license BSD
 */
import {
    StoreHelper,
    ElementHelper
}
from "./Utility";
import {updateBindingData} from "./actions";
import {transformBindingData} from "./DataHelper";
/**
 * helper method for the papers(collection of paper object) object
 */
const papers = ()=>{
    return {
	updateDisplayValues(oValues){
	    var oPapers = StoreHelper.getPapers();
	    var oPlaceholderValues = transformBindingData(oValues);
	    Object.keys(oPapers)
		.forEach((paperKey)=>{
		    paper.updatePlaceholderValues(oPapers[paperKey], oPlaceholderValues);
		});
	},
	updateDisplayValuesForSelectedPage(){
	    
	}
    };
}();
/**
 * helper method for single paper element
 * @returns {} 
 */
const paper = ()=>{
    return {
	getMappingForDevicenoElementKey(oPaper){
	    var oMapping = {};
	    Object.keys(oPaper.properties)
		.forEach((key)=>{
		    var propertyObj = oPaper.properties[key];
		    if(ElementHelper.isPlaceHolder(propertyObj.elementTypeId)){
			if(oMapping[propertyObj.bindingId]){
			    console.log("Duplicated place holder binding id :" + propertyObj.bindingId);
			}
			oMapping[propertyObj.bindingId] = propertyObj.key;
		    }
		});
	    return oMapping;
	},
	updatePlaceholderValues(oPaper,oValues){
	    var oMapping = this.getMappingForDevicenoElementKey(oPaper);
	    Object.keys(oMapping).forEach((deviceno)=>{
		if(oValues[deviceno]){
		    var elementKey = oMapping[deviceno];
		    oPaper.elements[elementKey].text = oValues[deviceno].join(",");
		}
	    });
	},
	getPlaceHolderElements(){
	    
	}
    };
}();

