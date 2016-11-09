import React from 'react';
import {} from "../consts";
import {generateUUID} from "../Utility";

const Toolbar = (state) =>(
  <div>
  <div className="dia-toolbar">
    <button name="zoomin" onClick={state.onZoomIn}>放大</button>
    <button name="zoomout"  onClick={state.onZoomOut}>缩小</button>
    <button name="redo"  onClick={state.onRedo}>恢复</button>
    <button name="undo" onClick={state.onUndo}>撤销</button>
    <button name="creat_sub_page" onClick={state.onCreateSubPage}>创建子图</button>
    <button name="delete_sub_page" onClick={state.onSave}>保存</button>
  </div>
  <div className="modal fade" tabIndex="-1" role="dialog">
      <div className="modal-dialog">
	  <div className="modal-content">
	      <div className="modal-header">
		  <h4 className="modal-title">创建子图</h4>
	      </div>
	      <div className="modal-body">
		  <ul className="react-form">
		      <li className="dia-center">
			  <label className="dia-label">类型</label>
			  <select className="dia-field" name="page-type">
			      <option value="1" defaultVaule>普通页面</option>
			      <option value="2">二级页面</option>
			  </select>
		      </li>
		      <li className="dia-center"><label className="dia-label">名称</label><input className="dia-field" type="text" name="name"/></li>
		  </ul>
	      </div>
	      <div className="modal-footer">
		  <button type="button" className="btn btn-default" onClick={state.onSaveSubPage}>保存</button>
		  <button type="button" className="btn btn-primary" onClick={state.onCancelSubPage}>取消</button>
	      </div>
	  </div>
      </div>
  </div>     
  </div>
);

export default Toolbar;
