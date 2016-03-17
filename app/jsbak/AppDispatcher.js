/**
 * @fileOverview Dispatcher instance on app level
 * @name AppDispatcher.js
 * @author Journey
 * @license TBD
 */
import {Dispatcher} from "./Dispatcher";
var AppDispatcher = Object.assign({}, Dispatcher.prototype, {
    
    /**
     * A bridge function between the views and the dispatcher, marking the action as 
     * a view action.
     * @param {object} action The data coming from the view.
     */
    handleViewAction: function(action){
	this.dispatch({
	    source:"VIEW_ACTION",
	    action: action
	});
    }
});

export {AppDispatcher};
