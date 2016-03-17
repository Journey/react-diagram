var _mistake_x = 0;
var _mistake_y = 0;
var _rootNode = null;
var Position = {
    setRoot: function(rootNode){
	_rootNode = rootNode;
    },
    /**
     * store the distance of element's top-left corner and the mouse position
     * @param {Event} mouseEvent
     * @param {DomElement} sourceElement
     */
    logMistakes: function(mouseEvent, sourceElement){
	var sourcePosition = this._getElementPosition(sourceElement);
	var mousePosition = this._getMousePosition(mouseEvent);
	this._setMistake(mousePosition, sourcePosition);
    },
    _getMousePosition: function(mouseEvent){
	return {
	    x: mouseEvent.clientX,
	    y: mouseEvent.clientY
	};
    },
    _getElementPosition: function(element){
	var clientRect = element.getBoundingClientRect();
	return {
	    x: clientRect.left,
	    y: clientRect.top
	};
    },
    _setMistake: function(mousePosition, sourcePosition){
	_mistake_x = mousePosition.x - sourcePosition.x;
	_mistake_y = mousePosition.y - sourcePosition.y;
    },
    _adjustPostion: function(mousePosition){
	var rootPosition = this._getElementPosition(_rootNode);
	return {
	    x: mousePosition.x - _mistake_x - rootPosition.x,
	    y: mousePosition.y - _mistake_y - rootPosition.y
	};
    },
    /**
     * cacluate the element position: mouse position/offset/gridsize
     * @param {Event} mouseEvent
     * @param {Int} gridSize
     * @returns {Object} position
     */
    perfectPosition: function(mouseEvent, gridSize){
	var position = this._getMousePosition(mouseEvent);
	position = this._adjustPostion(position);
	position.x = this._updatePosition(position.x, gridSize);
	position.y = this._updatePosition(position.y, gridSize);
	return position;
    },
    _updatePosition: function(position, gridSize){
	return Math.floor(position/gridSize) * gridSize;
    }
};
export {Position};
