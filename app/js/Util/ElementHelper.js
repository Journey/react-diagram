/**
 * Element Helper - used to determine the Special Elements. e.g. Text,PlaceHolder,GroupElement
 */
export const ElementHelper = (() => {
    //TODO:: REPLACE WITH THE REAL ID
    const TEXT_ID = 21;
    const PLACE_HOLDER_ID = 30;
    const GROUP = 20;
    return {
        isText: (eleTypeId) => {
            if (eleTypeId == TEXT_ID) {
                return true;
            }
            return false;
        },
        isPlaceHolder: (eleTypeId) => {
            if (eleTypeId == PLACE_HOLDER_ID) {
                return true;
            }
            return false;
        },
        isGroup: (eleTypeId) => {
            if (eleTypeId == GROUP) {
                return true;
            }
            return false;
        },
	getDeviceNumber: (property) => {
	    if(!property){
		return null;
	    }
	    
	    var elementTypeId = property.elementTypeId;
	    if(ElementHelper.isText(elementTypeId) || ElementHelper.isText(elementTypeId)){
		return null;
	    }
	    
	    if(ElementHelper.isGroup(elementTypeId)){
		return property.bindingId;
	    }

	    //normal element
	    return property.deviceInfo && property.deviceInfo.identifier;
	}
    };
})();
