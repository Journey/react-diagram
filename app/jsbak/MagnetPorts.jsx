/**
 * @fileOverview MangnentPorts Class: use in ca-element which is used to draw lines between ca-elements
 * @name MagnetPorts.jsx
 * @author your name <journey@gmail.com>
 * @license TBD
 */

"use strict";
import {generateUUID} from "./uuid";
import {Actions} from "./Actions";
import {Store} from "./Store";
import {Utility} from "./utility";
import {Position} from "./Position";
var MagnetPorts = React.createClass({
  /**
  * get ports positions: top/right/bottom/left
  * @param {} function
  * @returns {} 
  */
  getPositions: function(){
    var width = this.props.width;
    var height = this.props.height;
    width = width? width : 50;
    height = height? height : 50;
    var positions = [];
    positions.push({x:width/2,y:0});
    positions.push({x:width,y:height/2});
    positions.push({x:width/2,y:height});
    positions.push({x:0,y:height/2});
    return positions;
  },
   /**
   * will be triggerred when the mouse move out of the circle. if the mouse left button is down then should draw a line.
   * @param {Object} evt
   */
  onMouseOut: function(evt){
    // the left button is clicked
    if(evt.buttons === 1){
      //generate a line the start
      var portPosition = this._getPortPosition(evt.target);
      Actions.drawLineStart(portPosition);
    }
  },

  onMouseIn: function(evt){
    if(evt.buttons === 1){
      //todo:: the link end port
    }
  },
  /**
   * todo:: get port position via parentId + port position, move it to store
   * @param {} function
   * @returns {} 
   */
  
  _getPortPosition: function(port){
    var x = port.getAttribute("data-x");
    var y = port.getAttribute("data-y");
    return {
      x: parseFloat(x) + this.props.parentX,
      y: parseFloat(y) + this.props.parentY
    };
  },
  
  /**
   * @description render MagnetPorts
   * @param {} function
   * @returns {} 
   */
  render: function(){
    return (
      <g className="magnet-ports" draggable="false">
	{
	  this.getPositions().map(function(position){
	   return <circle r="6" key={generateUUID()} fill="#f1c40f" stroke="#000" opcity="0.9" transform={`translate(${position.x},${position.y})`} onMouseOut={this.onMouseOut} data-x={position.x} data-y={position.y}></circle>;
	  }.bind(this))
	}
      </g>
    );
  }
});

export {MagnetPorts};
