/**
 * the store helper used to access some informations in store. contains an referance to the redux golbal store
 * infromation
 */
import {DefaultValues} from "./DefaultValues";
import {ElementHelper} from "./ElementHelper";
import {LineHelper} from "./LineHelper";
import {POSITION_TOP,POSITION_RIGHT,POSITION_LEFT,POSITION_BOTTOM} from "../consts";

export const StoreHelper = (() => {
    var _store = null;

    function _getElements() {
	if(_store){
	    return _store.getState().elements;
	}
    };

    function _getLinks() {
	if(_store){
	    return _store.getState().links;
	}
    };

    function _getPallets() {
	if(_store){
            return _store.getState().groups;
	}
    };

    function _getSvgProperties() {
	if(_store){
	    return _store.getState().svgProperties;
	}
    };

    function _getPapers() {
	if(_store){
	    return _store.getState().papers;
	}
    };

    function _getProperties() {
	if(_store){
            return _store.getState().properties;
	}
    };

    function _getSelectedPageId() {
	if(_store){
	    return _store.getState().selectedPaperId;    
	}
    };
    return {
        /**
         * the setting method to store
         * @param {} oStore
         */
        setStore: (oStore) => {
	    window.__store__ = oStore;
            _store = oStore;
        },
	getStore: () => {
	    return _store;
	},
	hasStore: ()=>{
	    if(_store){
		return true;
	    }
	    return false;
	},
        getSvgProperties: () => {
            return _getSvgProperties();
        },
	getScale: () => {
	    var svgProperties = _getSvgProperties();
	    if(svgProperties){
		return svgProperties.scaleX;
	    }
	    return 1;
	},
	getElements: ()=>{
	    return _getElements();
	},
	getProperties: () => {
	    return _getProperties();  
	},
        getDispatch: () => {
            if (_store) {
                return _store.dispatch.bind(_store);
            }
            return null;
        },
        /**
         * sync paper data from active areas to the papers object
         */
        storeData: () => {
            var _state = _store.getState();
            var _selectedPaperId = _state.selectedPaperId;
            var paper = _state.papers[_selectedPaperId];
	    var svgProperties = Object.assign({},_state.svgProperties);
	    var zoomLevel = svgProperties.zoomLevel;
	    if(Math.abs(zoomLevel - 1) > 0.0001){
		svgProperties.width = parseInt(svgProperties.width/zoomLevel);
		svgProperties.height = parseInt(svgProperties.height/zoomLevel);
		svgProperties.scaleX = 1;
		svgProperties.scaleY = 1;
		svgProperties.zoomLevel = 1;
	    }
            paper.svgProperties = svgProperties;
            paper.elements = _state.elements;
            paper.links = _state.links;
            paper.properties = _state.properties.properties;
        },
        getElementProperties: (elementId) => {
            var properties = _getProperties();
            var elements = _getElements();
            var element = elements[elementId];
            var elementProperty = properties.properties[elementId];
            var elementTypeId = element.id;
            if (elementProperty) {
                //todo::
            } else {
                elementProperty = DefaultValues.getDefaultProperties(elementTypeId);
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
            if (ElementHelper.isText(iPalletelementid)) {
                retElement.text = "文字元素";
                retElement.width = 100;
                retElement.height = 20;
            } else if (ElementHelper.isGroup(iPalletelementid)) {
                retElement.bindingId = "";
                retElement.width = 150;
                retElement.height = 150;
            } else if (ElementHelper.isPlaceHolder(iPalletelementid)) {
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
        getSelectedPaperId: () => {
            return _getSelectedPageId();
        },
        hasSubPage: (elementKey) => {
            var papers = _getPapers();
            if (papers[elementKey]) {
                return true;
            }
	    var subpageUUID = Object.keys(papers)
		.find((paperUUID)=>{
		    if(papers[paperUUID].key === elementKey){
			return true;
		    }
		    return false;
		});
	    if(subpageUUID){
		return true;
	    }
            return false;
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
        getPaperIdentifier: (paper, elementKey) => {
            let property = paper.properties[elementKey];
            if (property) {
                return property.deviceInfo && property.deviceInfo.identifier;
            }
            return null;
        },
        isLastPaper: () => {
            var _papers = _getPapers();
            if (Object.keys(_papers).length > 1) {
                return false;
            }
            return true;
        },
        getPapers: () => {
            return _getPapers();
        },
        getNextPageOrder: () => {
            var papers = StoreHelper.getPapers();
            var largestPageOrder = Object.keys(papers).reduce((pre, curKey) => {
                if (papers[curKey].order > pre) {
                    return papers[curKey].order;
                } else {
                    return pre;
                }
            }, -1);
            return largestPageOrder + 1;
        }
    };
})();
