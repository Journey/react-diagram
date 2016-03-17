/**
 * @fileOverview The Line Component: used two link two ca-element, the start/end point is the MagnetPorts.
 * the the line contains two points - to determine the path
 * in order to remove the line, there should  be an remove button when mouse over it.
 * @name Line.jsx
 * @author Journey <journey@gmail.com>
 * @license TBD
 */

"use strict";
import {generateUUID} from "./uuid";
import {Actions} from "./Actions";
import {Store} from "./Store";
import {Utility} from "./utility";
import {Position} from "./Position";
import {MagnetPorts} from "./MagnetPorts.jsx";
var Line = React.createClass({
  propTypes:{
    startPoint:ReactPropTypes.object.isRequired,
    endPoint: ReactPropTypes.object.isRequired,
    id:ReactPropTypes.string.isRequired,
    isEditing: ReactPropTypes.bool.isRequired
  },
  getInitialState: function(){
    return {
      isEditing: false
    };
  },
  getPath: function(){
    var start = this.props.startPoint;
    var end = this.props.endPoint;
    return `M${start.x} ${start.y} L ${end.x} ${end.y} Z`;
  },
  getRemoveButtonPosition: function(){
    var start = this.props.startPoint;
    var end = this.props.endPoint;
    return {
      x: (start.x + end.x)/2,
      y: (start.y + end.y)/2
    }
  },
  onDelete: function(){
    console.log("delete line");
    Actions.deleteLine(this.props.id);
  },
  onDoubleClick: function(){
    Actions.selectLine(this.props.id);
  },
  /**
   * @description render Link
   * @param {} function
   * @returns {} 
   */
  render: function(){
    var removeButton = "";
    if(this.props.isEditing){
      var position = this.getRemoveButtonPosition();
      removeButton = <image onClick={this.onDelete}  x={position.x} y={position.y} xlinkHref="css/img/delete.png"/>
    }
    return (
      <g>
	<g className="ca-line" onDoubleClick={this.}>
	  <path d={this.props.path}/>
	  <image onClick={this.onDelete}  x={position.x} y={position.y} xlinkHref="css/img/delete.png" visibility={this.state.isEditing ? "visible" : "hidden"}/>
	</g>
      </g>
    );
  }
});

export {Line};
