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
}
from "./consts";
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

export const getRelativePosition = (evt) => {
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
        id: 1,
        name: "element one",
        image: "css/1.jpg",
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
export const setDragContext = (event, type, id) => {
    event.dataTransfer.setData("text/plain", type + id);
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
    if (sContext.indexOf(TYPE_PALLETELEMENT) > -1) {
        oContext.type = TYPE_PALLETELEMENT;
        oContext.id = sContext.split(TYPE_PALLETELEMENT)[1];
    } else if (sContext.indexOf(TYPE_CANVASELEMENT) > -1) {
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
    let _mistake = {
        x: 0,
        y: 0
    };
    let _gridSize = 20;

    function _alignPostion(iPosition) {
        var iUnit = Math.floor(iPosition / _gridSize);
        iUnit = iUnit > 0 ? iUnit : 0;
        return iUnit * _gridSize;
    }

    function _offset(element, window, document) {
        let box = element.getBoundingClientRect();
        return {
            top: box.top + window.pageYOffset - document.documentElement.clientTop,
            left: box.left + window.pageXOffset - document.documentElement.clientLeft
        };
    }
    //position relative to the element
    //http://stackoverflow.com/questions/3234256/find-mouse-position-relative-to-element
    function _positionRelativeToElement(event, element, window, document) {
        let offset = _offset(element, window, document);
        return {
            x: event.pageX - offset.left,
            y: event.pageY - offset.top
        };
    }
    return {
        setGridSize: (iSize) => {
            _gridSize = iSize;
        },
        getMousePostionRelativeToElement: (event, element, widnow, document) => {
            return _positionRelativeToElement(event, element, window, document);
        },
        logElementMistake: (event, element, window, document) => {
            let mistake = _positionRelativeToElement(event, element, window, document);
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
        elementKey: null,
        position: null
    };
    return {
        /**
         * wrap line start/end point info into a certain constructor
         * @param {Object} evt the react Event object
         * @returns {Object} oContext  contain type/id proerties
         */
        portInfo(elementKey, position) {
                return {
                    elementKey, position
                };
            },
            logStartInfo(key, position) {
                _startInfo = this.portInfo(key, position);
            },
            getStartInfo() {
                return _startInfo;
            },
            clearStartInfo() {
                _startInfo = this.portInfo(null, null);
            },
            isSamePort(startPort, endPort) {
                if (startPort.elementKey !== undefined && startPort.elementKey !== endPort.elementKey) {
                    return false;
                };
                return true;
            },
            getPath(startPoint, endPoint) {
                return `M${startPoint.x} ${startPoint.y} L${endPoint.x} ${endPoint.y} Z`;
            },
            /**
             * get the hover rect of the path
             * @param {string} path only composed by M L Z e.g 'M250 145 L360 145 Z'
             */
            getPathHoverRect(sPath) {
                let points = sPath.split(/[A-Z]/);
                //
                points = points.filter((value) => {
                    return value !== "";
                });
                //["22 33 ","33 44"] ->[[22,33],[33,44]]
                points = points.map((sPoints) => {
                    sPoints = sPoints.trim();
                    let aPoint = sPoints.split(/\s/);
                    return [parseInt(aPoint[0]), parseInt(aPoint[1])];
                });

                return RectHelper.getRectPathByPoints(points);
            }
    };
})();
//todo
export const RectHelper = (() => {
    const VERTICAL_TYPE = "Verticle Type";
    const HORIZONTAL_TYPE = "Horizontal Type";
    const UP_LINE = "Up Line";
    const DOWN_LINE = "Down Line";

    return {
        /**
         * get the rect area 
         * @param {} aPoints
         */
        getRectPathByPoints: (aPoints) => {
            let aUpArea = [],
                aDownArea = [];
            let sPath = "M",
                temp;
            for (let index = 0, length = aPoints.length; index < length - 1; index++) {
                temp = RectHelper.getRectPoints(aPoints[index], aPoints[index + 1]);
                aUpArea = aUpArea.concat(temp.up);
                aDownArea = aDownArea.concat(temp.down);
            }
            aUpArea.forEach((aPoint) => {
                sPath = sPath + aPoint[0] + " " + aPoint[1] + "L";
            });
            for (let len = aDownArea.length, inx = len; inx > 0; inx--) {
                temp = aDownArea[inx - 1];
                sPath = sPath + temp[0] + " " + temp[1] + "L";
            }
            sPath = sPath + aUpArea[0][0] + " " + aUpArea[0][1] + "Z";
            return sPath;
        },
        getLineType: (aStartPoint, aEndPoint) => {
            let deltaX = aEndPoint[0] - aStartPoint[0];
            let deltaY = aEndPoint[1] - aStartPoint[1];
            if (deltaX == 0) {
                return VERTICAL_TYPE;
            }
            if (deltaY == 0) {
                return HORIZONTAL_TYPE;
            }
            if (deltaY / deltaX > 0) {
                return UP_LINE;
            }
            return DOWN_LINE;
        },
        getRectPoints: (aStartPoint, aEndPoint) => {
            let lineDirction = RectHelper.getLineType(aStartPoint, aEndPoint);
            let [startX, startY] = aStartPoint;
            let [endX, endY] = aEndPoint;
            let aUpArea = [];
            let aDownArea = [];
            let dimension = 6;
            switch (lineDirction) {
                case UP_LINE:
                    aUpArea.push([startX - dimension, startY + dimension]);
                    aUpArea.push([endX - dimension, endY + dimension]);
                    aDownArea.push([startX + dimension, startY - dimension]);
                    aDownArea.push([endX + dimension, endY - dimension]);
                    break;
                case DOWN_LINE:
                    aUpArea.push([startX + dimension, startY + dimension]);
                    aUpArea.push([endX + dimension, endY + dimension]);
                    aDownArea.push([startX - dimension, startY - dimension]);
                    aDownArea.push([endX - dimension, endY - dimension]);
                    break;
                case HORIZONTAL_TYPE:
                    aUpArea.push([startX, startY + dimension]);
                    aUpArea.push([endX, endY + dimension]);
                    aDownArea.push([startX, startY - dimension]);
                    aDownArea.push([endX, endY - dimension]);
                    break;
                case VERTICAL_TYPE:
                    aUpArea.push([startX + dimension, startY]);
                    aUpArea.push([endX + dimension, endY]);
                    aDownArea.push([startX - dimension, startY]);
                    aDownArea.push([endX - dimension, endY]);
                    break;
            }
            return {
                up: aUpArea,
                down: aDownArea
            };
        }
    };
})();

/**
 * Element Helper - used to determine the Special Elements. e.g. Text,PlaceHolder,GroupElement
 */
export const ElementHelper = (() => {
    const TEXT_ID = 10;
    const PLACE_HOLDER_ID = 11;
    const GROUP = 12;
    return {
	isText: (eleTypeId) => {
	    if(eleTypeId == TEXT_ID){
		return true;
	    }
	    return false;
	},
	isPlaceHolder: (eleTypeId) => {
	    if(eleTypeId == PLACE_HOLDER_ID){
		return true;
	    }
	    return false;
	},
	isGroup: (eleTypeId) => {
	    if(eleTypeId == GROUP){
		return true;
	    }
	    return false;
	}
    };
})();

/**
 * the store helper used to access some informations in store. contains an referance to the redux golbal store
 * infromation
 */
export const StoreHelper = (() => {
    var _store = null;

    function _getElements() {
        return _store.getState().elements;
    }

    function _getLinks() {
        return _store.getState().links;
    }

    function _getPallets() {
        return _store.getState().groups;
    }

    function _getSvgProperties() {
        return _store.getState().svgProperties;
    }
    function _getPapers(){
	return _store.getState().papers;
    }
    function _getProperties() {
	return _store.getState().properties;
    }
    return {
        /**
         * the setting method to store
         * @param {} oStore
         */
        setStore: (oStore) => {
            _store = oStore;
        },
        getSvgProperties: () => {
            return _getSvgProperties();
        },
	/**
	 * sync paper data from active areas to the papers object
	 */
	storeData: () => {
	    var _state = _store.getState();
	    var _selectedPaperId = _state.selectedPaperId;
	    var paper = _state.papers[_selectedPaperId];
	    paper.svgProperties = _state.svgProperties;
	    paper.elements = _state.elements;
	    paper.links = _state.links;
	    paper.properties = _state.properties;
	},
	getElementProperties: (elementId) => {
	    var properties = _getProperties();
	    var elements = _getElements();
	    var element = elements[elementId];
	    var elementProperty = properties[elementId];
	    var elementTypeId = element.id;
	    if(elementProperty){
		//todo::
	    } else {
		elementProperty= DefaultValues.getDefaultProperties(elementTypeId);
	    }
	    return elementProperty;
	},
        getPalletElementInfoById: (iPalletelementid) => {
            var aGroups = _getPallets();
            var retElement = null;
            for (let groupInx = 0, groupLen = aGroups.length; groupInx < groupLen; groupInx++) {
                let group = aGroups[groupInx];
                retElement = group.items.find((item) => {
                    if (item.id == iPalletelementid) {
                        return true;
                    }
                    return false;
                });
                if (retElement) {
                    break;
                }
            }
	    if(ElementHelper.isText(iPalletelementid)){
		retElement.text = "文字元素";
		retElement.width = 100;
		retElement.height = 20;
	    } else if(ElementHelper.isGroup(iPalletelementid)){
		retElement.bindingId = "";
		
	    } else if(ElementHelper.isPlaceHolder(iPalletelementid)){
		retElement.text = "没有值";
		retElement.width = 100;
		retElement.height = 20;
		retElement.bindingId = "";
	    }
            return Object.assign({}, retElement);
        },
        getCanvasElmentInfoById: (sElementId) => {
            let oElements = _getElements();
            return Object.assign({}, oElements[sElementId]);
        },
        getPortPosition: (elementKey, position) => {
            let oElement = StoreHelper.getCanvasElmentInfoById(elementKey);
            let [startX, startY, width, height] = [oElement.x, oElement.y, oElement.width, oElement.height];
            let portPosition = null;
            switch (position) {
                case POSITION_TOP:
                    portPosition = {
                        x: startX + width / 2,
                        y: startY
                    };
                    break;
                case POSITION_RIGHT:
                    portPosition = {
                        x: startX + width,
                        y: startY + height / 2
                    };
                    break;
                case POSITION_BOTTOM:
                    portPosition = {
                        x: startX + width / 2,
                        y: startY + height
                    };
                    break;
                case POSITION_LEFT:
                    portPosition = {
                        x: startX,
                        y: startY + height / 2
                    };
                    break;
            }
            return portPosition;
        },
        getRefLinksByElementKey: (elementId) => {
            let oLinks = _getLinks();
            let aRefLinks = Object.keys(oLinks).filter((linkKey) => {
                let link = oLinks[linkKey];
                if (link.startPort.elementKey === elementId || link.endPort.elementKey === elementId) {
                    return true;
                }
                return false;
            });
            return aRefLinks;
        },
        getUpdatedLinks: (aLinkKeys) => {
            let oLinks = _getLinks();
            var oUpdatedLinks = {};
            aLinkKeys.forEach((key) => {
                let oldLink = oLinks[key];
                let startPoint = StoreHelper.getPortPosition(oldLink.startPort.elementKey, oldLink.startPort.position);
                let endPoint = StoreHelper.getPortPosition(oldLink.endPort.elementKey, oldLink.endPort.position);
                let path = LineHelper.getPath(startPoint, endPoint);
                oUpdatedLinks[key] = Object.assign({}, oldLink, {
                    path: path
                });
            });
            return oUpdatedLinks;
        },
	getSelectedPaper: (paperId) => {
	    var _papers = _getPapers();
	    if(paperId){
		return _papers[paperId];
	    } else {
		var keys = Object.keys(_papers);
		if(keys){
		    return _papers[keys[0]];
		}
	    }
	    return null;
	},
	isLastPaper: () => {
	    var _papers = _getPapers();
	    if(Object.keys(_papers).length > 1){
		return false;
	    }
	    return true;
	},
        getPapers: () => {
            return _getPapers();
        }
    };
})();

export const DefaultValues = (() => {
    return {
        getSvgProperties: () => {
            return {
                width: 1000,
                height: 1000,
                gridSize: 20,
                scaleX: 1,
                scaleY: 1,
                zoomLevel: 1
            };
        },
        getOperator: () => {
            return {
                id: null, //selected element id
                x: 100000,
                y: 100000,
                width: 10000,
                height: 10000,
                lineId: null //selected line id
            };
        },
	getDefaultPaper: (() => {
	    var id = generateUUID();
	    return () => {
		return {
			key: id,
			paperName: "默认",
			paperType: 1, // 普通页面
			svgProperties: DefaultValues.getSvgProperties(),
			elements:{},
			links:{},
			properties:{}
		};
	    };
	})(),
	generatePaper: (uuid,paperId,paperName,paperType)=>{
	    return {
                uuid: uuid,
		key: paperId,
		paperName: paperName,
		paperType: paperType,
		svgProperties: DefaultValues.getSvgProperties(),
		elements:{},
		links:{},
		properties:{},
		operator: DefaultValues.getOperator()
	    };
	},
	getDefaultPapers: () => {
	    var defaultPaper = DefaultValues.getDefaultPaper();
	    return {
		[defaultPaper.key]: defaultPaper
	    };  
	},
	getDefaultSelectedPaperId: (papers)=> {
	    return Object.keys(papers)[0];
	},
	getDefaultState: () => {
	    var defaultPaper = DefaultValues.getDefaultPaper();
	    var operator = DefaultValues.getOperator();
	    return {
		selectedPaperId: defaultPaper.key,
		svgProperties: defaultPaper.svgProperties,
		elements: defaultPaper.elements,
		properties: defaultPaper.properties,
		links: defaultPaper.links,
		operator: operator,
		papers:{
		    [defaultPaper.key]: defaultPaper
		}
	    };
	},
        getDefaultTextProperties: () => {
            return {text:"文字元素"};
        },
        getDefaultGroupProperties: () => {
            return {bindingId:""};
        },
        getDefaultPlaceholderProperties: () => {
            return {bindingId:""};
        },
	getDefaultProperties: (elementTypeId) => {
	    let _oProperties;
	    if(ElementHelper.isText(elementTypeId)){
		_oProperties = DefaultValues.getDefaultTextProperties();
	    } else if(ElementHelper.isGroup(elementTypeId)){
		_oProperties = DefaultValues.getDefaultGroupProperties();
	    } else if(ElementHelper.isPlaceHolder(elementTypeId)){
		_oProperties = DefaultValues.getDefaultPlaceholderProperties();
	    } else {
		_oProperties = {
		    deviceInfo: DefaultValues.getDeviceInfo(),
		    measurePointInfos: [DefaultValues.getMeasurePointInfo()]
		};
	    }
	    _oProperties.elementTypeId = elementTypeId;
	    return _oProperties;
	},
	getPalletDatas: ()=>{
	    //todo::
	},
	getDeviceInfo: () => {
	    return {name:"",serialNumber:""};
	},
	getMeasurePointInfo: ()=> {
	    return {
		name:"",
		identifier:"",
		type:"1"
	    };
	}
    };
})();
