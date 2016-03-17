import {AppDispatcher} from "./AppDispatcher";
import {Constants} from "./Constants";

var Actions = {
    /**
     * event triggerred when dbclick on the element in the canvas area. or click blank space of  the ca-area. 
     * @param {ca-element} element the cavas element or null which represent the canvas area.
     */
    changeSelection: function(element) {
	AppDispatcher.dispatch({
	    actionType:Constants.SELECTION_CHANGE,
	    element: element
	});
    },
    deleteLine: function(sLineId){
	AppDispatcher.dispatch({
	    actionType: "line-delete",
	    element: sLineId
	});
    },
    updateLine: function(){
	AppDispatcher.dispatch({
	    actionType: "line-update",
	    element: "todo::path"
	});
    },
    selectLine: function(sLineId){
	AppDispatcher.dispatch({
	    actionType: "line-select",
	    element:sLineId
	});
    },
    deselectLine: function(){
	AppDispatcher.dispatch({
	    actionType: "line-deselect",
	    element:null
	});
    },
    drawLineStart: function(startPort){
	AppDispatcher.dispatch({
	    actionType: "line-draw-start",
	    element: startPort
	});
    }
};

export {Actions};
