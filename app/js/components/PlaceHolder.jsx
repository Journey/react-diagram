import React from 'react';
import {generateUUID} from "../Utility";

const PlaceholderElement = ({id,typeId,x,y,text,width,height,dbClick,dragElementStart}) => {
  return (
    <g className="ca-element placeholder-element" transform={`translate(${x},${y})`} >
      <g draggable="true" data-type={typeId} onDoubleClick={dbClick} onDragStart={dragElementStart} data-key={id}>
	<g className="ca-text">
	  <text x="0" y="0">{text}</text>
	</g>
      </g>
    </g>
  )
};

export const PlaceholderProperties = ({elementKey,bindingId}) => {
  return (
    <div className="pro-deviceInfo" data-element-key={elementKey}>
      <div className="pro-header">绑定信息</div>
    <div className="pro-placeholder">
      <div className="pro-row">
	<label>id</label>
	<input name="binding-id" data-element-key={elementKey} type="text" defaultValue={bindingId}/>
      </div>
    </div>
    </div>
 )
}

export default PlaceholderElement;
