import {
    connect
}
from 'react-redux';
import {
    Canvas as CanvasView, StaticCanvas as StaticCanvasView,StaticCanvasWithClose
}
from "../components/Canvas.jsx";
import {
    StoreHelper
}
from "../Util/StoreHelper";
import {DataHelper} from "../Util/DataHelper";
import {PalletDataHelper} from "../Util/PalletDataHelper";
import {callbacks} from "../ext/callbacks";
import {
    addElement,
    moveElement,
    removeElement,
    removeLines,
    removeLine,
    clearSelection,
    addLine,
    updateLines,
    selectElement,
    selectCanvas,
    selectLine,
    openSubPage,
    closeSubPage
}
from "../actions";
import {
    generateUUID,
    getRelativePosition,
    setDragContext,
    getDragContextObject,
    Position,
    LineHelper
}
from "../Utility";
import {
    TYPE_CANVASELEMENT, TYPE_PALLETELEMENT
}
from "../consts";

const mapStateToProps = (state) => {
    return {
        width: state.svgProperties.width,
        height: state.svgProperties.height,
        gridSize: state.svgProperties.gridSize,
        scaleX: state.svgProperties.scaleX,
        scaleY: state.svgProperties.scaleY,
        zoomLevel: state.svgProperties.zoomLevel,
        elements: state.elements,
        links: state.links,
        properties: state.properties,
        operator: state.operator
    };
};
const mapDispatchtoProps = (dispatch) => {
    return {
        /**
         * add/move element, will be triggered when add an element by drop the element from the pallet,
         * or move an canvas element
         * 1. add an element - 
         * 2. move an element - 
         * @param {} evt
         */
        onDrop: (evt) => {
            let svgElement = evt.currentTarget;
            let position = Position.getMousePostionRelativeToElement(evt, svgElement, window, document);
            position = Position.correctElementPosition(position);
            let oContext = getDragContextObject(evt);
            switch (oContext.type) {
                case TYPE_PALLETELEMENT:
                    dispatch(addElement(oContext.id, position.x, position.y));
                    break;
                case TYPE_CANVASELEMENT:
                    dispatch(moveElement(oContext.id, position.x, position.y));
                    setTimeout(() => {
                        dispatch(updateLines(oContext.id));
                    }, 100);
                    break;
            }
            evt.preventDefault();
            //todo:: throw eorr on firefox
            //evt.dataTransfer.clearData();
        },
        onDragEnd: (evt) => {
            evt.preventDefault();
        },
        /**
         * todo:: remove an element
         * @param {} evt
         */
        removeElement: (evt) => {
            let key = evt.currentTarget.getAttribute("data-element-key");
            dispatch(removeLines(key));
            dispatch(removeElement(key));
            let {
                width, height, gridSize
            } = StoreHelper.getSvgProperties();
            dispatch(selectCanvas(width, height, gridSize));
        },
        removeLine: (event) => {
            let key = event.currentTarget.getAttribute("data-line-key");
            dispatch(removeLine(key));
        },
        /**
         * drag an element over the canvas area
         * @param {} evt
         */
        dragOver: (evt) => {
            evt.dataTransfer.dropEffect = "move";
            evt.preventDefault();
        },
        /**
         * drag an elements
         * @param {} evt
         */
        dragElementStart: (evt) => {
            var key = evt.currentTarget.getAttribute("data-key");
            setDragContext(evt, TYPE_CANVASELEMENT, key);
            evt.dataTransfer.dropEffect = "copy";
            evt.dataTransfer.effectAllowed = "copyMove";
            Position.logElementMistake(evt, evt.target, window, document);
        },
        /**
         * todo::double click on an elements
         * @param {} evt
         */
        dbClickElement: (evt) => {
            var key = evt.currentTarget.getAttribute("data-key");
            let elementInfo = StoreHelper.getCanvasElmentInfoById(key);
            let [x, y, width, height] = [elementInfo.x, elementInfo.y, elementInfo.width, elementInfo.height];
	    
		dispatch(selectElement(key, x, y, width, height));
	    evt.preventDefault();
	    evt.stopPropagation();
        },
        /**
         * dbclick on the blan area, will trigger the whole canvas selected
         * @param {} evt
         */
        dbClickCanvas: (evt) => {
            let {
                width, height, gridSize
            } = StoreHelper.getSvgProperties();
            dispatch(selectCanvas(width, height, gridSize));
            evt.preventDefault();
            evt.stopPropagation();
        },
        dbClickLine: (evt) => {
            let lineId = evt.currentTarget.getAttribute("data-key");
            console.log("line clicked:" + lineId);
            dispatch(selectLine(lineId));
            evt.preventDefault();
            evt.stopPropagation();
        },
        /**
         * log the port&owenr element info when mousedown on an port, currently used to draw line
         * @param {} event
         */
        onPortMouseDown: (event) => {
            let target = event.target;
            let ownerKey = target.getAttribute("data-owner-key");
            let portPosition = target.getAttribute("data-position");
            LineHelper.logStartInfo(ownerKey, portPosition);
        },
        /**
         * log the port&owner element info when mouseup on an port. if it is the same port with the 
         * port triggered onPortMouseDown, then do nothing; otherwise drawline
         * @param {} event
         */
        onPortMouseUp: (event) => {
            let target = event.target;
            let ownerKey = target.getAttribute("data-owner-key");
            let portPosition = target.getAttribute("data-position");
            let startInfo = LineHelper.getStartInfo();
            let endInfo = LineHelper.portInfo(ownerKey, portPosition);
            if (LineHelper.isSamePort(startInfo, endInfo)) {
                LineHelper.clearStartInfo();
            } else {
                dispatch(addLine(startInfo, endInfo));
            }
        },
        /**
         * used for static canvas to open subpages if has
         * @param {} event
         */
        openSubPage: (event) => {
            let target = event.currentTarget;
            let elementKey = target.getAttribute("data-key");
	    let paper = DataHelper.getPaper( StoreHelper.getSelectedPaperId() );
	    let identifier = StoreHelper.getPaperIdentifier(paper,elementKey);
            if (StoreHelper.hasSubPage(identifier)) {
                dispatch(openSubPage(DataHelper.getSubpaper(identifier)));
            }
	    let elementInfo = StoreHelper.getCanvasElmentInfoById(elementKey);
	    if(PalletDataHelper.isXuqiuce(elementInfo.id)){
		//todo:: open in a new tab
		console.log("this is xuqiuce");
		callbacks.openNew(identifier);
	    } 
        },
	closeSubPage:(event) => {
	    dispatch(closeSubPage());  
	},
        /**
         * used for static canvas to update the values of place holder
         * @param {} event
         */
        updatePlaceHolderData: (event) => {

        }
    };
};

const Canvas = connect(
    mapStateToProps,
    mapDispatchtoProps
)(CanvasView);

const StaticCanvas = connect(
    mapStateToProps,
    mapDispatchtoProps
)(StaticCanvasView);

const StaticSecondLevelCanvas = connect(
    (state) => {
        return {
	    hide: state.secondLevelPage.hide,
            width: state.secondLevelPage.svgProperties.width,
            height: state.secondLevelPage.svgProperties.height,
            gridSize: state.secondLevelPage.svgProperties.gridSize,
            scaleX: state.secondLevelPage.svgProperties.scaleX,
            scaleY: state.secondLevelPage.svgProperties.scaleY,
            zoomLevel: state.secondLevelPage.svgProperties.zoomLevel,
            elements: state.secondLevelPage.elements,
            links: state.secondLevelPage.links,
            properties: state.secondLevelPage.properties
        };
    },
    mapDispatchtoProps
)(StaticCanvasWithClose);

export {
    Canvas, StaticCanvas, StaticSecondLevelCanvas
};
