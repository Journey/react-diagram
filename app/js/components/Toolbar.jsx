import React from 'react';
import {} from "../consts";
import {generateUUID} from "../Utility";

const Toolbar = (state) =>(
  <div className="dia-toolbar">
    <button name="zoomin" onClick={state.onZoomIn}>放大</button>
    <button name="zoomout"  onClick={state.onZoomOut}>缩小</button>
    <button name="redo"  onClick={state.onRedo}>Redo</button>
    <button name="undo" onClick={state.onUndo}>撤销</button>
    <button name="creat_sub_page" onClick={state.onCreateSubPage}>创建子图</button>
    <button name="delete_sub_page" onClick={state.onDeleteSubPage}>删除子图</button>
    <button name="delete_sub_page" onClick={state.onSave}>保存</button>
  </div>
);

export default Toolbar;
