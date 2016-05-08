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

export const transformElementsStatus = (aData) => {
    //todo
    console.log("todo");
};

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
    return aData;
};
/**
 * transfrom external papers data  to diagram needed format, currently no implementation needed
 * @param {} oPapers
 * @returns {} 
 */
export const transformPapers = (oPapers) => {
    return oPapers;
};


