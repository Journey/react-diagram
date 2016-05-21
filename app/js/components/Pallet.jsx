import React, {PropTypes} from 'react';
const Item = ({onDrag,image,name,id}) =>(
  <li>
    <img src={image} data-id={id} alt={name} title={name} draggable="true" onDragStart={onDrag} />
    <span>{name}</span>
  </li>
);
  Item.propTypes = {
    onDrag: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    id:PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
  };

const Group = (data)=>{
  var expandStatus = {'dia-chevron-head':true,'glyphicon':true,'glyphicon-chevron-down':!data.isExpand,'glyphicon-chevron-up':data.isExpand};
  return (
  <div className="pallet-group">
    <div
	    className="dia-header"
	    data-group-id={data.id}
	    onClick={data.toggleExpand}>
      <span className={Object.keys(expandStatus).reduce((acc,key)=>{
	  if(expandStatus[key]){
	    return acc + " " + key;
	  }
	  return acc;
	},'')}></span>
      <span>{data.groupName}</span>
    </div>
    <ul className={data.isExpand? '' : 'hide'}>
      {
	data.items.map(item =>
	  <Item key={item.id}
	  {...item}
	  onDrag={data.onPalletElementDragStart}
	  />
	)
      }
    </ul>
  </div>
);
  }

Group.propTypes = {
  id: PropTypes.number.isRequired,
  onPalletElementDragStart: PropTypes.func.isRequired,
  groupName: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired).isRequired
};

const Pallet = (data) =>(
  <div className="pallet">
    <div className="dia-title">图元列表</div>
    <div className="pallet-content">
      {
	data.groups.map(group =>(
	  <Group
	  key={group.id}
	  {...group}
		  onPalletElementDragStart={data.onPalletElementDragStart}
		  toggleExpand={data.toggleExpand}
	  />
        ))	
      }
    </div>
  </div>
);
Pallet.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    groupName: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired
  })),
  onPalletElementDragStart: PropTypes.func.isRequired
};

export default Pallet;
