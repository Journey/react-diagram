import React from 'react';
import {generateUUID} from "../Utility";

const TextElement = ({id,typeId,x,y,text,width,height,dbClick,dragElementStart,draggable}) => {
  return (
    <g className="ca-element text-element" transform={`translate(${x},${y})`} >
      <g  draggable={draggable} data-type={typeId} onDoubleClick={dbClick} onDragStart={dragElementStart} data-key={id}>
	<g className="ca-text">
	  <text x="0" y="0">{text}</text>
	</g>
      </g>
    </g>
  )
};

export const TextProperties = ({elementKey,text}) => {
  return(
    <div className="pro-deviceInfo" data-element-key={elementKey}>
      <div className="pro-header">文本内容</div>
    <div className="pro-text">
      <div className="pro-row">
	<label>文字</label>
	<input name="text" data-element-key={elementKey} type="text" defaultValue={text}/>
      </div>
    </div>
    </div>
  )
};

export default TextElement;
