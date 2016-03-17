/**
 * The Canvas Component. is a drop zone which allowed drop an `pa-element`
 * @param {object} yuxin - global object
 * @return the Canvas Component
 */
"use strict";
import {generateUUID} from "./uuid";
import {Element} from "./element.jsx";
import {Grid} from "./Grid.jsx";
import {Utility} from "./utility";
import {Position} from "./Position";
import {CanvasAction} from "./CanvasAction";
import {CanvasStore} from "./CanvasStore";
var Canvas = React.createClass({
  getInitialState: function(){
    return {
	width: 1024,
	height: 768,
	gridSize: 10,
        elements:[],
        links:[],
        selectedElement: null
    }
  },
  dragOver: function(evt){
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "move";
  },
  drop: function(event){
    var info = event.dataTransfer.getData("text");
    var position = Position.perfectPosition(event,this.state.gridSize);
    if(Utility.isReposition(info)){
      //info: the key of the element
      this._updateElement(Utility.getKeyFromReposition(info),position);
    } else {
      // add new element
      this._addNewElement(info, position);
    }
    event.dataTransfer.clearData();
    event.preventDefault();
  },
  
  _addNewElement: function(elementType, elementPosition){
    var elementImage = this.props.getElementImageById(elementType);
    var elementSize = this.props.getElementSizeById(elementType);

    this.state.elements.push({
      width: elementSize.width,
      height: elementSize.height,
      x: elementPosition.x,
      y: elementPosition.y,
      image:elementImage.image,
      typeId:elementType,
      key:generateUUID()
    });
    this.setState({"elements": this.state.elements});
  },
  _updateElement: function(elementKey, position) {
    this.refs[elementKey].reposition(position);
  },
  /*the element position based on the event when drop the element and the canvas position which relative to the document node.
     mouse position - 
   */
  getPosition: function(evt){
    var position = this.getRootPosition();
    return {
      x: this.adjustPosition(evt.clientX - position.x),
      y: this.adjustPosition(evt.clientY - position.y)
    };
  },
  /*get the position of the canvase(relative to document)*/
  getRootPosition: function() {
    if (!this.root){
      this.root = ReactDOM.findDOMNode(this);
    }
    var position = this.root.getBoundingClientRect();
    return {
      x: position.left,
      y: position.top
    };
  },
  componentDidMount: function() {
    Store.addChangeListener();
    Position.setRoot(ReactDOM.findDOMNode(this));
  },

  componentWillUnmount: function() {
    //Store.removeChangeListener();
    Position.setRootNode(null);
  },
  /*adjust position based on the gridSize */
  adjustPosition: function(position) {
    return Math.floor(position/this.state.gridSize) * this.state.gridSize;
  },
  onElementUpdate: function(){
    console.log("on element update event triggered");
  },
  onElementSelectionChange: function(element){
    this.setState({selectedElement: element});
  },
  createElement: function(element){
	return <Element config={element} ref={element.key} key={element.key} update="{this.onElementUpdate} onSelect={this.onSelect}"></Element>
  },
  
  render: function(){
    return (
	<div className="canvas">
	<svg width={this.state.width} height={this.state.height} onDrop={this.drop} onDragOver={this.dragOver}>
	  <Grid key={generateUUID()} gridSize={this.state.gridSize} width={this.state.width} height={this.state.height}/>
	  {this.state.elements.map(this.createElement)}
	</svg>
	</div>
    );
  }
});

export {Canvas};
