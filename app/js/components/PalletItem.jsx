import React, {PropTypes} from 'react';
const PalletItem = ({onDrag,image,name,id}) =>(
  <li>
    <img src={image} data-id={id} alt={name} title={name} draggable="true" onDragStart={onDrag} />
  </li>
);
PalletItem.propTypes = {
  onDrag: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  id:PropTypes.number.isRequired,
  image: PropTypes.string.isRequired
};

export default PalletItem;
