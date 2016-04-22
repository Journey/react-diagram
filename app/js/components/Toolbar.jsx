import React from 'react';
import {} from "../consts";
import {generateUUID} from "../Utility";

const Toolbar = (state) =>(
  <div>
  <div className="dia-toolbar">
    <button name="zoomin" onClick={state.onZoomIn}>放大</button>
    <button name="zoomout"  onClick={state.onZoomOut}>缩小</button>
    <button name="redo"  onClick={state.onRedo}>Redo</button>
    <button name="undo" onClick={state.onUndo}>撤销</button>
    <button name="creat_sub_page" onClick={state.onCreateSubPage}>创建子图</button>
    <button name="delete_sub_page" onClick={state.onSave}>保存</button>
  </div>
  <div className="dia-overlay" style={{display:'none'}}>
  <div className="dia-sub-create">
    <div className="dia-center">创建子图</div>
    <ul>
      <li className="dia-center">
	<label>类型</label>
	<select name="page-type">
	  <option value="1" defaultVaule>普通页面</option>
	  <option value="2">二级页面</option>
	</select>
      </li>
      <li className="dia-center"><label>名称</label><input type="text" name="name"/></li>
      <li className="dia-center"><label>id</label><input type="text" name="identify"/></li>
    </ul>
    <div className="dia-center">
      <button onClick={state.onSaveSubPage}>保存</button>
      <button onClick={state.onCancelSubPage}>取消</button>
    </div>
  </div>
  </div>
  </div>
);

export default Toolbar;
