import {AppDispatcher} from "./AppDispatcher";
import {Constants} from "./Constants";

var CanvasActions = {
    addElement: function(){
	AppDispatcher.dispatch({
	    actionType:"add-element",
	    content:""
	});
    },
    removeElement: function(){
	AppDispatcher.dispatch({
	    actionType:"remove-element",
	    content:""
	});
    },
    addLink: function(){
	AppDispatcher.dispatch({
	    actionType:"add-link",
	    content:""
	});
    },
    removeLink: function(){
	AppDispatcher.dispatch({
	    actionType:"remove-link",
	    content:""
	});
    }
};

export {CanvasActions};
