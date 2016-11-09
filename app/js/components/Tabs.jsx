import React, {PropTypes} from 'react';
import {generateUUID,dummyFunction} from "../Utility";
const Confirm = (state) =>(
    <div className="modal fade" tabIndex="-1" role="dialog" id="react-diagram-delete-page-confirm">
	<div className="modal-dialog">
	    <div className="modal-content">
		<div className="modal-header">
		    <h4 className="modal-title">确认</h4>
		</div>
		<div className="modal-body">
		    确认删除该页面？
		</div>
		<div className="modal-footer">
		    <button type="button" className="btn btn-default" onClick={state.deletePaper}>确认</button>
		    <button type="button" className="btn btn-primary" onClick={state.hideDeleteConfirm}>取消</button>
		</div>
	    </div>
	</div>
    </div>
);
const Tab = ({paperId,paperName,paperType,deletePaper,selectPaper,isSelected}) =>(
  <div className={isSelected?"dia-tab selected" : "dia-tab"} data-paper-id={paperId}>
    <span onClick={selectPaper} className="dia-tab-name">{paperName}</span>
    <span className="dia-del-tab bootstrap glyphicon glyphicon-remove" onClick={deletePaper}></span>
  </div>
);
const StaticTab =  ({paperId,paperName,paperType,selectPaper,isSelected}) =>(
  <div className={isSelected?"dia-tab selected" : "dia-tab"} data-paper-id={paperId}>
    <span onClick={selectPaper}>{paperName}</span>
  </div>
); 
const Tabs = (data) =>(
    <div>
	<Confirm deletePaper={data.deletePaper} hideDeleteConfirm={data.hideDeleteConfirm}/>
	<div className="dia-tabs">
	    {
		Object.keys(data.papers).sort((pre,next)=>{
		    return data.papers[pre].order - data.papers[next].order;
		}).map((key)=>{
		    var paper = data.papers[key];
		    return <Tab
				   key={generateUUID()}
				   paperId={key}
				   paperName={paper.paperName}
				   paperType={paper.paperType}
				   deletePaper={data.onDeletePressed}
				   selectPaper={data.clickPaper}
				   isSelected={data.selectedPaperId === key ? true : false} />
		})
	    }
	</div>
  </div>
);

const StaticTabs = (data) =>(
  <div className="dia-tabs">
    {
      Object.keys(data.papers).sort((pre,next)=>{
	return data.papers[pre].order - data.papers[next].order;
      }).filter((key)=>{
	return data.papers[key].paperType == 1;
      }).map((key)=>{
	var paper = data.papers[key];
	return <StaticTab
		       key={generateUUID()}
		       paperId={key}
		       paperName={paper.paperName}
		       paperType={paper.paperType}
		       selectPaper={data.clickPaper}
		       isSelected={data.selectedPaperId === key ? true : false} />

      })
    }
  </div>
);

export {Tabs,StaticTabs};
