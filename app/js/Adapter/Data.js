import {parseImageSize, transformStatuses, getDefaultStatusImage} from "./PalletData";
/**
 * transformBindingData transform binding data from array to Object.
 * @param {} aData [{
      "$id": "1",
      "datasource": null,
      "deviceno": "N5-BC",
      "deviceproperty": "BC",
      "propertyvalue": 0.5,
      "valueunit": "度",
      "occurtime": "2015-07-25T10:52:16",
      "id": null,
      "name": "BC"
    }]
 * @return oBindingData {"deviceno":["3.4w"]}
 */
export const transformBindingData = (aData) => {
    var oBindingData = {};
    aData.forEach((oData)=> {
	let oDeviceData;
	var deviceno = oData.deviceno;
	
	if(!oBindingData[deviceno]){
	    oBindingData[deviceno] = [];
	}
	oDeviceData = oBindingData[deviceno];
	oDeviceData.push(oData.propertyvalue+oData.valueunit);
    });
    return oBindingData;
};

/**
 * transform external element status data. will be used to update element image by status
 * @param {Array} aData
 *   [{
 *     "$id":"1",
 *     "datasource":null,
 *     "deviceno":"N5-BC",
 *     "deviceproperty":"电池电量",
 *     "propertyvalue":"true",
 *     "occurtime":"2015-04-30T16:07:51",
 *     "id":null,"name":"电池"
 *   }]
 */
export const transformElementsStatus = (aData) => {
    var oStatus = {};
    aData.forEach((oData)=> {
		oStatus[oData.deviceno] =  _transfromStatusValue(oData.propertyvalue);
    });
    return oStatus;
};

/**
 * transfrom status value to status id in pallet data.
 * @param {} sValue
 * @returns {} 
 */
function _transfromStatusValue(sValue){
    //todo
    if(sValue){//运行
		return 1;
    }
    return 3; //停机
}

/**
 * transfrom signal type data which will be used on the common element property section
 * @param {} aTypes
 * @returns {} 
 */
export const transformSignalTypes = (aTypes) => {
    return aTypes.map((oType)=>{
	return {
	    id: oType.id,
	    name: oType.name
	};
    });
};
/**
 * transfrom external pallet group data to diagram needed format
 * @param {} aData
 * @returns {} 
 */
export const transfromPalletGroupData = (aData)=>{
    return aData.map((oGroup)=>{
	var deviceItems = oGroup.devicetypes;
	deviceItems = oGroup.devicetypes.map((oDevice)=> {
	    var oSize = parseImageSize(oDevice.size);
	    return {
			id: oDevice.id,
			name: oDevice.name,
			width: oSize.width,
			height: oSize.height,
			image: getDefaultStatusImage(oDevice.statuses), // the default images
			statuses: transformStatuses(oDevice.statuses)
	    };
	});
	return {
	    id: oGroup.id,
	    groupName: oGroup.name,
	    isExpand: false,
	    items: deviceItems
	};
    });
};
/**
 * transfrom external papers data  to diagram needed format, currently no implementation needed
 * @param {} oPapers
 * @returns {} 
 */
export const transformPapers = (oPapers) => {
    return oPapers;
};


