/**
 * @fileOverview The Store for the Canvas. used to bridge the dispatch and the view.
 * @name CanvasStore.js
 * @author Journey
 * @license TBD
 */
import {AppDispatcher} from "./AppDispatcher";
import {EventEmitter} from "./EventEmitter";
import {Constants} from "./Constants";
/**
 * The schema of element {key:"uuid",width,height,x:iXPositiion,y:iYPosition,image:image,typeId:elementType}
 * The schema of link {key:"uuid",source:{key:"",position:""},target:{key:"",position:"1/2/3/4"}}--top/right/bottom/left
 */
var _object = {
    width: 1024,
    height:768,
    gridSize: 10,
    elements:{},
    relationships:{}
};
var _selectedObject = null; //element or link
var CanvasStore = Object.assign({},EventEmitter.prototype,{
    setWidth: function(iWidth){
	_object.width = iWidth;
    },
    setHeight: function(iHeight){
	_object.height = iHeight;
    },
    setGridSize: function(iGridSize){
	_object.gridSize = iGridSize;
    },
    addElement: function(element){
	_object.elements.push(element);
    },
    /**
     * remove the element, should also remove the links which related with the element.
     * @param {string} key The uuid of the element
     */
    removeElement: function(key){
	if(_object.elements.hasOwnProperty(key)){
	    var relatedLinks = this.getLinksConnectedByElement(key);
	    relatedLinks.forEach(function(key,inx){
		this.removeLink(key);
	    }.bind(this));
	    delete _object.elements[key];
	}
    },
    /**
     * get the links which connected with the element
     * @param {string} elementKey - the uuid of the element
     * @returns {array} the links which related with the element 
     */
    getLinksConnectedByElement: function(elementKey){
	var obj = null;
	var selectedLinks = [];
	for(var key in _object.relationships){
	    obj = _object.relationships[key];
	    if(obj.source.key === elementKey || obj.target.key === elementKey){
		selectedLinks.push(key);
	    }
	}
	return selectedLinks;
    },
    /**
     * removeLink - remvoe the link from the store
     * @param {string} key - the uuid of link
     */
    removeLink: function(key){
	if(_object.relationships.hasOwnProperty(key)){
	    delete _object.relationships[key];
	}
    },
    /**
     * addLink - add a link to the canvas
     * @param {string} key - an uuid to identify the link
     * @param {object} source - {key:"",position:"1/2/3/4"} top/right/bottom/left port
     * @param {object} target - {key:"",position:"1/2/3/4"}
     */
    addLink: function(key,source, target){
	_object.relationships[key] = {
	    source:source,
	    target: target
	};
    }
});

AppDispatcher.register(function(action){
    var content = action.content;
    switch(action.actionType){
    case "add-element":
	CanvasStore.addElement(content);
    	break;
    case "remove-element":
	CanvasStore.removeElement(content);
	break;
    case "add-link":
	CanvasStore.addLink(content.key,content.source,content.target);
	break;
    case "remove-link":
	CanvasStore.removeLink(content);
	break;
    }
});

export {CanvasStore};
