import React from 'react';
import {POSITION_TOP,POSITION_RIGHT,POSITION_BOTTOM,POSITION_LEFT} from "../consts";
import {LineHelper,generateUUID} from "../Utility";
const MagnetPorts = ({x,y}) => {
  return (
    <g draggable="false">
      <circle r="6" transform={`translate(${x},${y})`}></circle>
    </g>
  );
};
const Element = ({id,typeId,image,x,y,width,height}) => {
  let [midHorizontal, midVertical] = [width/2, height/2];
  let [top,right,bottom,left] = [
    {x: midHorizontal,y:0},
    {x: width, y:midVertical},
    {x: midHorizontal, y:height},
    {x: 0, y:midVertical}
  ];
  return (
    <g className="ca-element" transform={`translate(${x},${y})`} >
      <g draggable="true" data-key={id}>
	<g className="ca-border">
	  <rect width={width+2} height={height+2}></rect>
	</g>
	<g className="ca-img">
	  <image x="0" y="0" height={height} width={width} xlinkHref={image}></image>
	</g>
      </g>
      <g className="magnet-ports">
	<MagnetPorts {...top} ownerKey={id} position={POSITION_TOP} />
	<MagnetPorts {...right} ownerKey={id} position={POSITION_RIGHT}/>
	<MagnetPorts {...bottom} ownerKey={id} position={POSITION_BOTTOM}/>
	<MagnetPorts {...left} ownerKey={id} position={POSITION_LEFT}/>
      </g>
    </g>
  )
};
const Link = ({path,id}) => {
  return (
    <g className="link" data-key={id}>
      <path id={id} d={path} />
    </g>
  )
};
const StaticCanvas = (data) =>(
  <div className="canvas">
    <svg width={data.width} height={data.height}>
      <g transform={`scale(${data.scaleX},${data.scaleY})`}>
      <g className="links">
	{
	  Object.keys(data.links).map(key =>{
	    let properties = data.links[key];
	    return <Link path={properties.path} key={properties.key} id={properties.key}/>
	  })
	}
      </g>
      <g className="elements">
      {
	Object.keys(data.elements).map( (key) =>{
	  let properties= data.elements[key];
	  return <Element {...properties} id={properties.key}/>
	})
      }
      </g>
      </g>
    </svg>
  </div>
);

export default StaticCanvas;
