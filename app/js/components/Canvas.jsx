import React from 'react';
import {POSITION_TOP,POSITION_RIGHT,POSITION_BOTTOM,POSITION_LEFT} from "../consts";
import {LineHelper,generateUUID,ElementHelper,dummyFunction} from "../Utility";
import {GridHelper} from "../Util/gridHelper";
import TextElement from "./TextElement.jsx";
import PlaceholderElement from "./PlaceHolder.jsx";
import GroupElement from "./GroupElement.jsx";
const MagnetPorts = ({x,y,ownerKey,position,onPortMouseDown,onPortMouseUp}) => {
  return (
    <g draggable="false">
      <circle r="3" transform={`translate(${x},${y})`} data-owner-key={ownerKey} data-position={position} onMouseUp={onPortMouseUp} onMouseDown={onPortMouseDown}></circle>
    </g>
  );
};
const Element = ({id,typeId,image,x,y,width,height,dbclick,dragElementStart,onPortMouseUp,onPortMouseDown,dbClick,draggable}) => {
  let [midHorizontal, midVertical] = [width/2, height/2];
  let [top,right,bottom,left] = [
    {x: midHorizontal,y:0},
    {x: width, y:midVertical},
    {x: midHorizontal, y:height},
    {x: 0, y:midVertical}
  ];
  return (
    <g className="ca-element" transform={`translate(${x},${y})`} >
      <g draggable={draggable} onDoubleClick={dbClick} onDragStart={dragElementStart} data-key={id}>
	<g className="ca-border">
	  <rect width={width+2} height={height+2}></rect>
	</g>
	<g className="ca-img">
	  <image x="0" y="0" height={height} width={width} xlinkHref={image}></image>
	</g>
      </g>
      <g className="magnet-ports">
	<MagnetPorts {...top} ownerKey={id} position={POSITION_TOP} onPortMouseDown={onPortMouseDown} onPortMouseUp={onPortMouseUp}/>
	<MagnetPorts {...right} ownerKey={id} position={POSITION_RIGHT} onPortMouseDown={onPortMouseDown} onPortMouseUp={onPortMouseUp}/>
	<MagnetPorts {...bottom} ownerKey={id} position={POSITION_BOTTOM} onPortMouseDown={onPortMouseDown} onPortMouseUp={onPortMouseUp}/>
	<MagnetPorts {...left} ownerKey={id} position={POSITION_LEFT} onPortMouseDown={onPortMouseDown} onPortMouseUp={onPortMouseUp}/>
      </g>
    </g>
  )
};
const Link = ({path,id,dbClick}) => {
  return (
    <g className="link" data-key={id} onDoubleClick={dbClick}>
      <path id={id} d={path} />
      <path className="path-hover" d={LineHelper.getPathHoverRect(path)}></path>
    </g>
  )
};
const LineOperator = ({lineId,onRemoveClick}) => {
  return (
    <g className="line-operator">
      <text>
	<textPath xlinkHref={`#${lineId}`} data-line-key={lineId} onClick={onRemoveClick}>删除</textPath>
      </text>
    </g>
  );
};
const ElementOperator = ({id,x,y,width,height,onRemoveClick}) => {
  return (
    <g className="operator" transform={`translate(${x-3},${y-3})`}>
      <g className="operator-del">
	<text data-element-key={id} onClick={onRemoveClick} x={width/2} y="-5"  textAnchor="middle">删除</text>
      </g>
      <rect className="operator-hightlight" width={width+8} height={height+8}/>
    </g>
  )
}
const Canvas = (data) =>(
  <div className="canvas">
    <svg width={data.width*data.zoomLevel} height={data.height*data.zoomLevel} onDrop={data.onDrop} onDragOver={data.dragOver} onDragEnd={data.onDragEnd} onDoubleClick={data.dbClickCanvas} style={{background:'url('+GridHelper.getBase64Image()+")"}}>
    <g transform={`scale(${data.zoomLevel},${data.zoomLevel})`}>
      <g className="links">
	{
	  Object.keys(data.links).map(key =>{
	    let properties = data.links[key];
	    return <Link path={properties.path} key={properties.key} dbClick={data.dbClickLine} id={properties.key}/>
	  })
	}
      </g>
      <g className="elements">
	{
	  Object.keys(data.elements).map( (key) =>{
	    let properties= data.elements[key];
	    let elementType = properties.id;
	    if(ElementHelper.isText(elementType)){
	      return <TextElement {...properties} id={properties.key} dbClick={data.dbClickElement} dragElementStart={data.dragElementStart} draggable={true}/>
	    } else if(ElementHelper.isPlaceHolder(elementType)){
	      return <PlaceholderElement  {...properties} id={properties.key} dbClick={data.dbClickElement} dragElementStart={data.dragElementStart} draggable={true}/>
	    } else if(ElementHelper.isGroup(elementType)){
	      return <GroupElement {...properties}  id={properties.key} dbClick={data.dbClickElement} dragElementStart={data.dragElementStart} draggable={true}/>
	    } else {
	      return <Element {...properties} id={properties.key} dbClick={data.dbClickElement} dragElementStart={data.dragElementStart} onPortMouseUp={data.onPortMouseUp} onPortMouseDown={data.onPortMouseDown} draggable={true}/>
	    }
	    
	  })
	}
      </g>
      <ElementOperator key={generateUUID()} {...data.operator} onRemoveClick={data.removeElement}></ElementOperator>
      <LineOperator key={generateUUID()} lineId={data.operator.lineId} onRemoveClick={data.removeLine}></LineOperator>
      </g>
    </svg>
  </div>
);

const StaticCanvas = (data) => (
  <div className="canvas">
    <svg width={data.width} height={data.height} onDrop={dummyFunction} onDragOver={dummyFunction} onDragEnd={dummyFunction} onDoubleClick={dummyFunction}>
      <g transform={`scale(1,1)`}>
	<g className="links">
	  {
	    Object.keys(data.links).map(key =>{
	      let properties = data.links[key];
	      return <Link path={properties.path} key={properties.key} dbClick={dummyFunction} id={properties.key}/>
	    })
	  }
	</g>
	<g className="elements">
	  {
	    Object.keys(data.elements).map( (key) =>{
	      let properties= data.elements[key];
	      let elementType = properties.id;
	      if(ElementHelper.isText(elementType)){
		      return <TextElement {...properties} id={properties.key} dbClick={dummyFunction} dragElementStart={dummyFunction} draggable={false}/>
	      } else if(ElementHelper.isPlaceHolder(elementType)){
		      return <PlaceholderElement  {...properties} id={properties.key} dbClick={dummyFunction} dragElementStart={dummyFunction} draggable={false}/>
	      } else if(ElementHelper.isGroup(elementType)){
		return <GroupElement {...properties}  id={properties.key} dbClick={data.openSubPage} dragElementStart={dummyFunction} draggable={false}/>
	      } else {
		return <Element {...properties} id={properties.key} dbClick={data.openSubPage} dragElementStart={dummyFunction} onPortMouseUp={dummyFunction} onPortMouseDown={dummyFunction} draggable={false}/>
	      }
	      
	    })
	  }
	</g>
      </g>
    </svg>
  </div>
);
const StaticCanvasWithClose = (data) =>(
  <div className="dia-overlay" style={{display: data.hide? "none":"block"}}>
    <div>
      <div onClick={data.closeSubPage} className="dia-close"><span className="glyphicon glyphicon-remove"></span></div>
    </div>
    <StaticCanvas key={generateUUID()} {...data} />
  </div>
);

export {Canvas,StaticCanvas,StaticCanvasWithClose};
