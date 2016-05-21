/**
 * store the pallet data, is an array [group1, group2].
 * @returns {object} the getter/setter of the pallet data
 */
export const PalletDataHelper = (() => {
    var _palletData = null;
    return {
        get data(){
            return _palletData;
        },
        set data (aData){
            _palletData = aData;
        },
	/**
	 * get element object by element id
	 * @param {} deviceId
	 */
	getDeviceById(deviceId){
	    return _palletData.find((oGroup) => {
		return oGroup.items.find((oElement) => {
		    if(oElement.id === deviceId){
			return true;
		    }
		    return false;
		});
	    });
	},
	/**
	 * get element status image by status id
	 * @param {} oElement
	 * @param {} statusId
	 */
	getImageByStatus(oElement,statusId){
	    var oStatus = oElement.statuses.find((oStatus)=>{
		if(oStatus.id === statusId){
		    return true;
		}
		return false;
	    });
	    if(oStatus){
		return oStatus.image;
	    }
	    return null;
	},
	getDeviceStatusImage(deviceId,statusId){
	    var oDevice = PalletDataHelper.getDeviceById(deviceId);
	    return PalletDataHelper.getImageByStatus(oDevice, statusId);
	},
	isXuqiuce(elementTypeId){
	    var oGroup;
	    oGroup = _palletData.find((oGroup)=>{
		return oGroup.items.find((oItem)=>{
		    if(oItem.id === elementTypeId){
			return true;
		    }
		    return false;
		});
	    });
	    if(oGroup.id === 3){
		return true;
	    }
	    return false;
	}
    };
})();
