/**
 * @fileOverview used to dispatch the 
 * @name Dispatcher.js
 * @author 
 * @license 
 */

var Dispatcher = function(){};
var _callbacks = [];
Object.assign(Dispatcher.prototype, {
    /**
     * @fileOverview Register a Store's callback so that it maybe invoked by an action.
     *  will be used within the stores to register each store's callback.
     * @param {} callback
     * @returns {} 
     */
    register: function(callback){
	_callbacks.push(callback);
	return _callbacks.length - 1;
    },
    /**
     * dispatch - will be used within the actions to trigger the invocation of the callbacks
     * @param {object} payload The data from the action
     */
    dispatch: function(payload) {
	var resolves = [];
	var rejects = [];
	var _promised = _callbacks.map(function(_,inx){
	    return new Promise(function(resolve, reject){
		resolves[inx] = resolve;
		rejects[inx] = reject;
	    });
	});
	_callbacks.forEach((callback, i)=>{
	    Promise
		.resolve(callback(payload))
		.then(function(){
		    resolves[i](payload);
		})
		.catch(function(){
		    rejects[i](payload);
		});
	});
	_promised = [];
    },
    /**
     * remove the callback by token
     * @param {string} id Token
     */
    unregister: function(id){
	
    },
    /**
     *  
     * @param {array} promiseIndexed
     * @param {function} callback
     */
    waitFor: function(promiseIndexes, callback){
	var slectedPromises = promiseIndexes.map(function(index){
	    //todo:: transform to promises
	    return _callbacks[index];
	});
	return Promise.all(selectedPromises).then(callback);
    },
    /**
     * the status of the Dispatcher
     */
    isDispatching: function(){
	
    }
});

export {Dispatcher};
