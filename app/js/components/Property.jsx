import React from 'react';
import {CANVAS,COMMON_ELEMENT} from "../consts";
import {generateUUID} from "../Utility";
const SVGProperties = ({width,height,gridSize}) =>{
  return (
  <div>
    <div className="pro-row">
      <label>宽度</label>
      <input type="number" name="width" min="200" defaultValue={width} />
    </div>
    <div className="pro-row">
      <label>高度</label>
      <input type="number" name="height" min="200" defaultValue={height} />
    </div>
    <div className="pro-row">
      <label>网格大小</label>
      <input type="number" name="gridSize" step="5" min="10" max="100" defaultValue={gridSize} />
    </div>
  </div>
    );
};
const MeasureInfo = ({name,identifier,type,onRemoveMeasurePoint,index,onMeasurePointValueChange}) => {
  return (
    <div className="measure-template">
      <div className="measure-remove" style={{display: "block"}}>
	<button onClick={onRemoveMeasurePoint} data-index={index}>删除</button>
      </div>
      <div>
	<div className="pro-row">
	  <label>名称</label>
	  <input type="text" name="name" defaultValue={name} data-index={index} onChange={onMeasurePointValueChange}/>
	</div>
	<div className="pro-row">
	  <label>编号</label>
	  <input type="text" name="identifier" defaultValue={identifier} data-index={index} onChange={onMeasurePointValueChange} />
	</div>
	<div className="pro-row">
	  <label>类型</label>
	  <select name="type" defaultValue={type} data-index={index} onChange={onMeasurePointValueChange}>
	    <option value="1">遥测</option>
	    <option value="2">遥信</option>
	    <option value="3">遥控</option>
	    <option value="4">遥调</option>
	  </select>
	</div>
      </div>
    </div>
  );
};
const GeometricDataElement = ({width,height,x,y,onGeometricDataChange}) => {
  return (
    <div className="pro-geo-data">
      <div className="pro-header">几何数据</div>
      <div className="pro-row">
	<label>宽度</label>
	<input type="number" name="width" step="1" min="10" max="1000" defaultValue={width} onBlur={onGeometricDataChange}/>
      </div>
      <div className="pro-row">
	<label>高度</label>
	<input type="number" name="height" step="1" min="10" max="1000" defaultValue={height}  onBlur={onGeometricDataChange}/>
      </div>
      <div className="pro-row">
	<label>x轴</label>
	<input type="number" name="xAxies" step="1" min="10" max="1000" defaultValue={x}  onBlur={onGeometricDataChange}/>
      </div>
      <div className="pro-row">
	<label>y轴</label>
	<input type="number" name="yAxies" step="1" min="10" max="1000" defaultValue={y}  onBlur={onGeometricDataChange}/>
      </div>
    </div>
  );
};
const CommonElement = ({geometricData,elementKey, deviceInfo, measurePointInfos, onAddMeasurePoint, onRemoveMeasurePoint,onMeasurePointValueChange,onGeometricDataChange}) => {

  return (
    <div>
      <GeometricDataElement key={generateUUID()} {...geometricData} onGeometricDataChange={onGeometricDataChange}/>
      <div className="pro-deviceInfo" data-element-key={elementKey}>
	<div className="pro-header">设备</div>
	<div className="pro-row">
	  <label>名称</label>
	  <input type="text" name="name" defaultValue={deviceInfo.name}/>
	</div>
	<div className="pro-row">
	  <label>编号</label>
	  <input type="text" name="identifier" defaultValue={deviceInfo.identifier}/>
	</div>
      </div>
      <div className="measure-info">
	<div className="pro-header"><span>测点</span> <button type="button" onClick={onAddMeasurePoint}>+</button> </div>
	{
	  measurePointInfos.map((oBinding,index) => {
	    return (
	      <MeasureInfo {...oBinding} key={generateUUID()} index={index} onRemoveMeasurePoint={onRemoveMeasurePoint} onMeasurePointValueChange={onMeasurePointValueChange}/>
	    )
	  })
	}
      </div>
    </div>
  )
};

const TextProperties = (key,text) => {
  return (
    <div className="pro-text">
      <div className="pro-row">
	<label>文字</label>
	<input type="text" value={text}/>
      </div>
    </div>
  )
};
const PropertyFactory = (state) => {
  switch(state.type){
    case CANVAS:
      return (
	<SVGProperties key={generateUUID()} {...state.selectedProperties}></SVGProperties>
      )
      break;
    case COMMON_ELEMENT:
      return (
	<CommonElement key={generateUUID()} elementKey={state.selectedProperties.key} {...state.selectedProperties} onAddMeasurePoint={state.onAddMeasurePoint} onRemoveMeasurePoint={state.onRemoveMeasurePoint} onMeasurePointValueChange={state.onMeasurePointValueChange} onGeometricDataChange={state.onGeometricDataChange}></CommonElement>
      )
      break;
    default:
      return <div>empty</div>
  }
};
const Property = (state) =>(
  <div className="pro-area">
    <div></div>
    <div>
      {PropertyFactory(state)}
      <div className="align-center">
	<input type="button" onClick={state.onSave} data-key={state.key} data-selected-type={state.type} value="保存" />
      </div>
    </div>
    <div className="dia-map-navigator">
      
    </div>
  </div>
);

export default Property;
