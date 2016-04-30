import React, {PropTypes} from 'react';
import {generateUUID,dummyFunction} from "../Utility";
const Tab = ({paperId,paperName,paperType,deletePaper,selectPaper,isSelected}) =>(
  <div className={isSelected?"dia-tab selected" : "dia-tab"} data-paper-id={paperId}>
	<span onClick={selectPaper}>{paperName}</span><span className="dia-del-tab" onClick={deletePaper}>x</span>
  </div>
);
const StaticTab =  ({paperId,paperName,paperType,selectPaper,isSelected}) =>(
  <div className={isSelected?"dia-tab selected" : "dia-tab"} data-paper-id={paperId}>
    <span onClick={selectPaper}>{paperName}</span>
  </div>
); 
const Tabs = (data) =>(
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
		       deletePaper={data.deletePaper}
		       selectPaper={data.clickPaper}
		       isSelected={data.selectedPaperId === key ? true : false} />

	})
      }
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
