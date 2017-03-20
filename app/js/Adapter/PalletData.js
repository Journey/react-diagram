var _oSize = {
    "big": {
	width: 70,
	height: 70
    },
    "medium": {
	width: 30,
	height: 30
    },
    "small": {
	width: 20,
	height: 20
    },
    "tiny": {
	width: 10,
	height: 10
    }
};
function tempUpdateUrl(relativeURL){
    if(relativeURL){
        //TODO:: remove
       //relativeURL = relativeURL.replace("..","http://121.40.218.110");
	   //relativeURL = relativeURL.replace("..","http://180.153.142.134");
    }
    return relativeURL;
}
export const parseImageSize = (sSize) => {
    if(_oSize[sSize]){
	return _oSize[sSize];
    }
    var aSize = sSize.split("*");
    return {
	width: parseInt(aSize[0]),
	height: parseInt(aSize[1])
    };
};

export const transformStatuses = (aStatuses) => {
    return aStatuses.map((oStatus) => {
	return {
	    id: oStatus.status.id,
	    name: oStatus.status.name,
	    isDefault: oStatus.isdefault,
	    image: tempUpdateUrl(oStatus.imageurl)
	};
    });
};

export const getDefaultStatusImage = (aStatuses) => {
    var oDefault =  aStatuses.find((oStatus)=> {
	return oStatus.isdefault;
    });
    return oDefault ? tempUpdateUrl(oDefault.imageurl) : "";
};
