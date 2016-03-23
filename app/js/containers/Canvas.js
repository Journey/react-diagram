import {connect} from 'react-redux';
import Canvas from "../components/Canvas.jsx";
import {StoreHelper} from "../Utility";
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
    selectLine
} from "../actions";
import {
    generateUUID,
    getRelativePosition,
    setDragContext,
    getDragContextObject,
    Position,
    LineHelper
} from "../Utility";
import {TYPE_CANVASELEMENT,TYPE_PALLETELEMENT} from "../consts";

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
	    let position = Position.getMousePostionRelativeToElement(evt,svgElement,window,document);
	    position = Position.correctElementPosition(position);
	    let oContext = getDragContextObject(evt);
	    switch(oContext.type){
	    case TYPE_PALLETELEMENT:
		dispatch(addElement(oContext.id,position.x,position.y));
		break;
	    case TYPE_CANVASELEMENT:
		dispatch(moveElement(oContext.id,position.x,position.y));
		setTimeout(()=>{
		    dispatch(updateLines(oContext.id));
		},100);
		break;
	    }
	    evt.preventDefault();
	    //todo:: throw eorro on firefox
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
	dragElementStart: (evt) =>{
	    var key = evt.currentTarget.getAttribute("data-key");
	    setDragContext(evt,TYPE_CANVASELEMENT,key);
	    evt.dataTransfer.dropEffect = "copy";
	    evt.dataTransfer.effectAllowed = "copyMove";
	    Position.logElementMistake(evt,evt.target,window,document);
	},
	/**
	 * todo::double click on an elements
	 * @param {} evt
	 */
	dbClickElement: (evt) => {
	    var key = evt.currentTarget.getAttribute("data-key");
	    let elementInfo = StoreHelper.getCanvasElmentInfoById(key);
	    let [x,y,width,height] = [elementInfo.x,elementInfo.y,elementInfo.width,elementInfo.height];
	    dispatch(selectElement(key,x,y,width,height));
	    evt.preventDefault();
	    evt.stopPropagation();
	},
	/**
	 * dbclick on the blan area, will trigger the whole canvas selected
	 * @param {} evt
	 */
	dbClickCanvas: (evt) => {
	    let{width,height,gridSize} = StoreHelper.getSvgProperties();
	    dispatch(selectCanvas(width,height,gridSize));
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
	    LineHelper.logStartInfo(ownerKey,portPosition);
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
	    let endInfo = LineHelper.portInfo(ownerKey,portPosition);
	    if(LineHelper.isSamePort(startInfo,endInfo)){
		LineHelper.clearStartInfo();
	    } else {
		dispatch(addLine(startInfo,endInfo));
	    }
	}
    };
};

export default connect(
    mapStateToProps,
    mapDispatchtoProps
)(Canvas);
