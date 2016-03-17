import {connect} from 'react-redux';
import Canvas from "../components/Canvas.jsx";
import {addElement,moveElement,removeElement, clearSelection, addLine, updateLines} from "../actions";
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
	elements: state.elements,
	links: state.links,
	properties: state.properties
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
	    evt.preventDefault();
	    let svgElement = evt.target;
	    //make sure get the svg element
	    if(!!svgElement.ownerSVGElement){//in case drag element with litter movement.
		svgElement = svgElement.ownerSVGElement;
	    }
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
	    evt.dataTransfer.clearData();
	},
	/**
	 * todo:: remove an element
	 * @param {} evt
	 */
	removeElement: (evt) => {
	    dispatch(removeElement(evt.id));
	},
	/**
	 * drag an element over the canvas area
	 * @param {} evt
	 */
	dragOver: (evt) => {
	    evt.preventDefault();
	    evt.dataTransfer.dropEffect = "move";
	},
	/**
	 * drag an elements
	 * @param {} evt
	 */
	dragElementStart: (evt) =>{
	    var key = evt.target.getAttribute("data-key");
	    setDragContext(evt,TYPE_CANVASELEMENT,key);
	    evt.dataTransfer.dropEffect = "copy";
	    evt.dataTransfer.effectAllowed = "copyMove";
	    Position.logElementMistake(evt,evt.target,window,document);
	},
	/**
	 * todo::double click on an element
	 * @param {} evt
	 */
	dbclick: (evt) => {
	    
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
