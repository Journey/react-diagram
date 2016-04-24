import React, {PropTypes} from 'react';
const Tab = ({paperId,paperName,paperType,deletePaper,clickPaper}) =>(
  <div className="dia-tab" data-paper-id={paperId}>
	<span onClick={clickPaper}>{paperName}</span><span onClick={deletePaper}>X</span>
  </div>
);
const Tabs = (data) =>(
  <div className="pallet">
    <h3>图元列表</h3>
    <div className="pallet-content">
      {
	data.groups.map(group =>(
	  <Group
	  key={group.id}
	  {...group}
	  onPalletElementDragStart={data.onPalletElementDragStart}
	  />
        ))	
      }
    </div>
  </div>
);
Tabs.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    groupName: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired
  })),
  onPalletElementDragStart: PropTypes.func.isRequired
};

export default Tabs;
