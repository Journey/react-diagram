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
import {PalletDataHelper} from "./PalletDataHelper";

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
/**
 * update the element image url by path
 * @param {} elements
 * @param {} properties
 * @param {Object} oValues {devicenum:statusid}
 * @returns {} 
 */
function _updateElementsStatus(elements,properties,oValues){
    var oElements = {};
    Object.keys(oValues).forEach((sDeviceNum)=> {
	var elementUUID = Object.keys(properties).find((uuid)=>{
	    var property = properties[uuid];
	    if(property && property.measurePointInfos && property.measurePointInfos.length > 0){
	    	var matched = property.measurePointInfos.find((item) => {
	    		if(item.identifier === sDeviceNum) {
	    			return true;
	    		}
	    		return false;
	    	});
	    	if (matched) {
	    		return true;
	    	}
	    }
	    return false;
	});
	if(elementUUID){
	    var element = elements[elementUUID];
	    var image = PalletDataHelper.getDeviceStatusImage(element.id, oValues[sDeviceNum]);
	    oElements[elementUUID] = Object.assign({},elements[elementUUID],{image:image});
	}
    });
    return oElements;
}
export const updatePlaceholderValues = (oValues, oElements) => {
    var elements = StoreHelper.getElements();
    var properties = StoreHelper.getProperties();
    return _updatePlaceholdersValues(elements,properties.properties,oValues);
};
export const updateElementsStatus = (oStatus, oElements) => {
    var elements = StoreHelper.getElements();
    var properties = StoreHelper.getProperties();
    return _updateElementsStatus(elements,properties.properties,oStatus);
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
     * @param {Object} oValues the values which represent element status {devcieNum:statusId}
     * @returns {Object}  oPapers The papers with new status
     */
    updateElementsStatus(oValues){
		var oPapers = StoreHelper.getPapers();
		var _updatedPapers = {};
		Object.keys(oPapers)
		    .forEach((paperKey)=>{
				var paper = oPapers[paperKey];
				var updatedElements = _updateElementsStatus(paper.elements,paper.properties,oValues);
				if(Object.keys(updatedElements).length > 0){
					let elements = Object.assign({},paper.elements,updatedElements);
					let updatedPaper = Object.assign({},paper,{"elements": elements});
					_updatedPapers[paperKey] = updatedPaper;
				} else {
					_updatedPapers[paperKey] = paper;
				}
				
		    });
		return _updatedPapers;
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
			invalideMessages.push(`子页面${oPapers[subPaperUUID].paperName}绑定设备:${subPages[subPaperUUID]} 不存在`);
			return false;
		    }
		});
	var duplicateInfo = this.checkDuplicateInfo(oPapers);
	if(duplicateInfo){
	    isValide = false;
	    invalideMessages = invalideMessages.concat(duplicateInfo);
	}
	return {
	    isValide: !!isValide,
	    messages: invalideMessages
	};
    },
    /**
     * check if has duplicated infomation: same device numbers
     * @param {} oPaper
     * @returns {} 
     */
    checkDuplicateInfo(oPapers){
	var oDeviceNumbers = {};
	var aErrorMessages = [];
	Object.keys(oPapers).forEach((sPaperKey)=>{
	    var oPaper = oPapers[sPaperKey];
	    var oProperties = oPaper.properties;
	    Object.keys(oProperties).forEach((key)=>{
		var property = oProperties[key];
		var deviceNumber = property && property.deviceInfo && property.deviceInfo.identifier;
		if(deviceNumber){
		    if(oDeviceNumbers[deviceNumber]){
			aErrorMessages.push(`重复的设备编号:${deviceNumber}`);
		    } else {
			oDeviceNumbers[deviceNumber] = true;
		    }
		}

		var duplicateBindingInfo = paper.checkDuplicateBindingInfo(property);
		if(duplicateBindingInfo){
		    aErrorMessages = aErrorMessages.concat(duplicateBindingInfo);
		}
	    });
	});
	if(aErrorMessages.length > 0){
	    return aErrorMessages;
	}
	return false;
    },
    getElementUUIDbyDeviceNumber: function(oPapers,sDeviceNumber){
	var oElement = Object.keys(oPapers).find((oPaper) => {
	    return paper.getDeviceByDeviceNumber(oPaper,sDeviceNumber);
	});
	if(oElement){
	    return oElement.uuid;
	}
	return null;
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
    },
    getDeviceByDeviceNumber(paper, deviceNumber){
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
    },
        

    
    checkDuplicateBindingInfo(oElementProperty){
	var oMeasureId = {};
	var aErrorMessages = [];
	var aMeasurePointInfos = oElementProperty.measurePointInfos;
	if(aMeasurePointInfos && aMeasurePointInfos.length > 0){
	    aMeasurePointInfos.forEach((oInfo) => {
		if(oInfo.identifier){
		    if(oMeasureId[oInfo.identifier]){
			aErrorMessages.push(`有重复的测点${oInfo.identifier}`);
		    } else {
			oMeasureId[oInfo.identifier] = true;
		    }
		}
	    }); 
	}
	return aErrorMessages.length > 0 ? aErrorMessages : false;
    }
};
