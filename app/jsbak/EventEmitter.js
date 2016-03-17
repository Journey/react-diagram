/**
 * @fileOverview the simple version of EventEmmiter
 * @name EventEmitter.js
 * @author Journey
 * @license 
 */
var _registration = new Map();
var EventEmitter = function(){};
Object.assign(EventEmitter.prototype,{
    /**
     * registe the actions with the channel infomation. the channel should be an array
     * @param {String} channel The channel name.
     * @param {Function} action The aciton will be invoked.
     */
    on: function(channel,action){
	if(!_registration.has(channel)){
	    _registration.set(channel,[]);
	}
	_registration.get(channel).push(action);
    },
    /**
     * trigger the action list which registered on the channel.
     * @param {String} channel
     */
    emit: function(channel){
	var actions = _registration.get(channel);
	if(actions) {
	    actions.forEach((action,inx)=>{
		action();
	    });
	}
    },
    /**
     * remove the channel, from the registration object. 
     * @param {String} channel The channel name.
     */
    remove: function(channel){
	if(_registration.has(channel)){
	    _registration.delete(channel);
	}
    },
    /**
     * clear the registration object.
     */
    clear: function(){
	_registration.clear();
    }
});
export {EventEmitter};
