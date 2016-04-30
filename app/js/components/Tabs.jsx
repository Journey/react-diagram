import React, {PropTypes} from 'react';
import {generateUUID} from "../Utility";
const Tab = ({paperId,paperName,paperType,deletePaper,selectPaper,isSelected}) =>(
  <div className={isSelected?"dia-tab selected" : "dia-tab"} data-paper-id={paperId}>
	<span onClick={selectPaper}>{paperName}</span><span onClick={deletePaper}>x</span>
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

export default Tabs;
