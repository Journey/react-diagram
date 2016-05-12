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
import {StoreHelper} from "./Util/StoreHelper";
import {DefaultValues} from "./Util/DefaultValues";
import {ElementHelper} from "./Util/ElementHelper";
import {LineHelper} from "./Util/LineHelper";
import {generateUUID} from "./Util/UUID";
import {DataHelper} from "./Util/DataHelper";

export {StoreHelper, DefaultValues,ElementHelper,LineHelper,generateUUID};

export const getRelativePosition = (evt) => {
    return {
        x: 100,
        y: 200
    };
};

export const dummyFunction = () => {
    return false;
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
    let _gridSize = 10;

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
	    var scale = StoreHelper.getScale();
            var realX = (oPosition.x - _mistake.x)/scale;
            var realY = (oPosition.y - _mistake.y)/scale;
            return {
                x: _alignPostion(realX),
                y: _alignPostion(realY)
            };
        }
    };
})();





