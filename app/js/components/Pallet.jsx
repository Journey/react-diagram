import React, {PropTypes} from 'react';
const Item = ({onDrag,image,name,id}) =>(
  <li>
    <img src={image} data-id={id} alt={name} title={name} draggable="true" onDragStart={onDrag} />
  </li>
);
  Item.propTypes = {
    onDrag: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    id:PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
  };

const Group = (data)=>(
  <div className="pallet-group">
    <h4>{data.groupName}</h4>
    <ul>
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
    <h3 className="dia-header">图元列表</h3>
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
Pallet.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    groupName: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired
  })),
  onPalletElementDragStart: PropTypes.func.isRequired
};

export default Pallet;
