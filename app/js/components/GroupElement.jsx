import React from 'react';
import {generateUUID} from "../Utility";

const GroupElement = ({id,typeId,x,y,width,height,dbClick,dragElementStart,draggable}) => {
  return (
    <g className="ca-element group-element" transform={`translate(${x},${y})`} >
      <g draggable={draggable} data-type={typeId} onDoubleClick={dbClick} onDragStart={dragElementStart} data-key={id}>
	<g className="ca-border">
	  <rect width={width+2} height={height+2}></rect>
	</g>
      </g>
    </g>
  )
};

export const GroupProperties = ({elementKey,bindingId}) => {
  return (
    <div className="pro-deviceInfo" data-element-key={elementKey}>
      <div className="pro-header">组信息</div>
    <div className="pro-group">
      <div className="pro-row">
	<label>id</label>
	<input name="binding-id" data-element-key={elementKey} type="text" defaultValue={bindingId}/>
      </div>
    </div>
    </div>
)
};

export default GroupElement;
