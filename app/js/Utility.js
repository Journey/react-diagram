/**
 * @Define Utility
 * @name Utility.js
 * @author journey
 * @license BSD
 */
import {
    TYPE_PALLETELEMENT,
    TYPE_CANVASELEMENT,
    TYPE_CANVASLINE,
    POSITION_TOP,
    POSITION_RIGHT,
    POSITION_BOTTOM,
    POSITION_LEFT
} from "./consts";
let uuidTemplate = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
/**
 * generate uuid
 * @returns {string} uuid
 */
export const generateUUID = () => {
    return uuidTemplate.replace(/[xy]/g, function(c) {
        var r = crypto.getRandomValues(new Uint8Array(1))[0] % 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

export  const getRelativePosition = (evt) => {
    return {
	x: 100,
	y: 200
    };
};
/**
 * store the pallet data, is an array [group1, group2].
 * @returns {object} the getter/setter of the pallet data
 */
export const PalletData = (() => {
    var _palletData = null;
    return {
	get: () => {
	    return _palletData;
	},
	set: (data) => {
	    _palletData = data;
	}
    };
})();

/**
 * todo::get the pallet element via the element  type id
 * @param {int} id the pallet element type id
 * @returns {object} the properties of the element  
 */
export const getElementById = (id) => {
    return {
	id:1,
	name:"element one",
	image:"css/1.jpg",
	width: 50,
	height: 50
    };
};

/**
 * set the context data which logs the infomation to describe the drag event occurs
 * @param {object} event the react Event object
 * @param {string} type the type of the drag event which indicates occured on pallet or canvas area.
 * @param {int} id the id of the pallet element
 */
export const setDragContext = (event, type,id) => {
    event.dataTransfer.setData("text/plain",type+id);
};

/**
 * get the drag context which the drag event occurs
 * @param {object} event the react Event object
 * @returns {string}  the data object which stored by setDrageContext
 */
export const getDragContext = (event) => {
    return event.dataTransfer.getData("text");
};

/**
 * parse the drag context from an string to an object
 * @param {string} sContext the context which stored via setDragContext
 * @returns {object} oContext which contained type/id properties 
 */
export const parseDragContext = (sContext) => {
    let oContext = {
	type: null,
	id: null
    };
    if(sContext.indexOf(TYPE_PALLETELEMENT) > -1) {
	oContext.type = TYPE_PALLETELEMENT;
	oContext.id = sContext.split(TYPE_PALLETELEMENT)[1];
    } else if(sContext.indexOf(TYPE_CANVASELEMENT) > -1) {
	oContext.type = TYPE_CANVASELEMENT;
	oContext.id = sContext.split(TYPE_CANVASELEMENT)[1];
    }
    return oContext;
};

/**
 * get the drag context object via the event directly. is an wrapper method.
 * @param {Object} evt the react Event object
 * @returns {Object} oContext  contain type/id proerties
 */
export const getDragContextObject = (evt) => {
    return parseDragContext(getDragContext(evt));
};

/**
 * the object which contains the position ajust functions.
 * @returns {} 
 */
export const Position = (() => {
    let _mistake = {x:0,y:0};
    let _gridSize = 20;
    function _alignPostion(iPosition) {
	var iUnit = Math.floor(iPosition/_gridSize);
	iUnit = iUnit > 0 ? iUnit : 0;
	return iUnit * _gridSize;
    }
    function _offset(element, window, document){
	let box = element.getBoundingClientRect();
	return {
	    top: box.top + window.pageYOffset - document.documentElement.clientTop,
	    left: box.left + window.pageXOffset - document.documentElement.clientLeft
	};
    }
    //position relative to the element
    //http://stackoverflow.com/questions/3234256/find-mouse-position-relative-to-element
    function _positionRelativeToElement(event,element,window,document){
	let offset = _offset(element,window,document);
	return {
	    x: event.pageX - offset.left,
	    y: event.pageY - offset.top
	};
    }
    return {
	setGridSize: (iSize) => {
	    _gridSize = iSize;  
	},
	getMousePostionRelativeToElement: (event,element,widnow,document) => {
	    return _positionRelativeToElement(event,element,window,document);
	},
	logElementMistake: (event,element,window,document) => {
	    let mistake = _positionRelativeToElement(event,element,window,document);
	    _mistake.x = mistake.x;
	    _mistake.y = mistake.y;
	},
	correctElementPosition: (oPosition) => {
	    var realX = oPosition.x - _mistake.x;
	    var realY = oPosition.y - _mistake.y;
	    return {
		x: _alignPostion(realX),
		y: _alignPostion(realY)
	    };
	}
    };
})();
/**
 * Line Helper. used to log some temp information for draw lines, and provide some helper operations
 * @returns {Object} Line Helper methods
 */
export const LineHelper = (() => {
    let _startInfo = {
	elementKey:null,
	position: null
    };
    return {
	/**
	 * wrap line start/end point info into a certain constructor
	 * @param {Object} evt the react Event object
	 * @returns {Object} oContext  contain type/id proerties
	 */
	portInfo(elementKey,position){
	    return {elementKey,position};
	},
	logStartInfo(key,position){
	    _startInfo = this.portInfo(key,position);
	},
	getStartInfo(){
	    return _startInfo;
	},
	clearStartInfo(){
	    _startInfo = this.portInfo(null,null);
	},
	isSamePort(startPort,endPort) {
	    if(startPort.elementKey !== undefined && startPort.elementKey !== endPort.elementKey){
		return false;
	    };
	    return true;
	},
	getPath(startPoint, endPoint) {
	    return `M${startPoint.x} ${startPoint.y} L${endPoint.x} ${endPoint.y} Z`;
	}
    };
})();

/**
 * the store helper used to access some informations in store. contains an referance to the redux golbal store
 * infromation
 */
export const StoreHelper = (() =>{
    var _store = null;
    function _getElements(){
	return _store.getState().elements;
    }
    function _getLinks(){
	return _store.getState().links;
    }
    function _getPallets(){
	return _store.getState().groups;
    }
    function _getSvgProperties(){
	return _store.getState().svgProperties;
    }
    return {
	/**
	 * the setting method to store
	 * @param {} oStore
	 */
	setStore: (oStore) => {
	    _store = oStore;
	},
	getSvgProperties: ()=>{
	    return _getSvgProperties();
	},
	getPalletElementInfoById:(iPalletelementid) => {
	    var aGroups = _getPallets();
	    var retElement = null;
	    for(let groupInx = 0,groupLen = aGroups.length; groupInx < groupLen; groupInx++){
		let group = aGroups[groupInx];
		retElement = group.items.find((item)=>{
		    if(item.id == iPalletelementid ){
			return true;
		    }
		    return false;
		});
		if(retElement){
		    break;
		}
	    }
	    return Object.assign({},retElement);
	},
	getCanvasElmentInfoById: (sElementId) => {
	    let oElements = _getElements();
	    return Object.assign({},oElements[sElementId]);
	},
	getPortPosition:(elementKey, position) => {
	    let oElement = StoreHelper.getCanvasElmentInfoById(elementKey);
	    let [startX,startY,width,height] = [oElement.x,oElement.y,oElement.width,oElement.height];
	    let portPosition = null;
	    switch(position){
	    case POSITION_TOP:
		portPosition = {
		    x: startX + width/2,
		    y: startY
		};
		break;
	    case POSITION_RIGHT:
		portPosition = {
		    x: startX + width,
		    y: startY + height/2
		};
		break;
	    case POSITION_BOTTOM:
		portPosition = {
		    x: startX + width/2,
		    y: startY + height
		};
		break;
	    case POSITION_LEFT:
		portPosition = {
		    x: startX,
		    y: startY + height/2
		};
		break;
	    }
	    return portPosition;
	},
	getRefLinksByElementKey: (elementId) => {
	    let oLinks = _getLinks();
	    let aRefLinks = Object.keys(oLinks).filter((linkKey) => {
		let link = oLinks[linkKey];
		if(link.startPort.elementKey === elementId || link.endPort.elementKey === elementId) {
		    return true;
		}
		return false;
	    });
	    return aRefLinks;
	},
	getUpdatedLinks: (aLinkKeys) => {
	    let oLinks = _getLinks();
	    var oUpdatedLinks = {};
	    aLinkKeys.forEach( (key)=> {
		let oldLink = oLinks[key];
		let startPoint = StoreHelper.getPortPosition(oldLink.startPort.elementKey, oldLink.startPort.position);
		let endPoint = StoreHelper.getPortPosition(oldLink.endPort.elementKey, oldLink.endPort.position);
		let path = LineHelper.getPath(startPoint, endPoint);
		oUpdatedLinks[key] = Object.assign({},oldLink,{path: path});
	    });
	    return oUpdatedLinks;
	}
    };
})();
