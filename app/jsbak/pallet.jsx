
/**
 * @Define Pallet Component. The Component is composed by Group Component which is composed by Item Component.
 * @name pallet.jsx
 * @author Journey
 * @license BSD
 */

'use strict';
import {generateUUID} from './uuid';
import {Position} from './Position';
/**
* Depends on UUID function
* @param {} function
* @returns {} 
*/
   
  /* Item Component is displayed via an image + text. And will capture the drag event of the element.
     The component depends on html5's drag&drop capability:
     the html5's data attribute - 
     The configration data is like:
     {
       src:"",
       name:"",
       id:"",
       type:""
     }
   */
  
  var Item = React.createClass({
    drag: function(event){
      Position.logMistakes(event, ReactDOM.findDOMNode(this) );
      event.dataTransfer.setData("text/plain", event.target.dataset.id);
      event.dataTransfer.dropEffect = "copy";
      event.dataTransfer.effectAllowed = "copyMove";
    },
    render: function(){
      return (
	<li>
n	  <img src={this.props.config.image} data-id={this.props.config.id} alt={this.props.config.name} title={this.props.config.name} draggable="true" onDragStart={this.drag} />
	</li>
      )
    }
  });

  var Group = React.createClass({
    render: function(){
      function createItem(oConfig){
	return <Item key={generateUUID()} config={oConfig}></Item>
      };
      return (
	<div className="pallet-group">
	<h4>{this.props.title}</h4>
	<ul>
	{this.props.items.map(createItem)}
	</ul>
	</div>
      )
    }
  });

  var Pallet = React.createClass({
    render: function(){
      var aGroups = [];
      this.props.model.data.forEach( (groupModel)=>{
	aGroups.push(<Group key={generateUUID()} title={groupModel.groupName} items={groupModel.items}></Group>);
      });
      return (
	<div className="pallet">
	<h3>图元列表</h3>
	<div className="pallet-content">
	  {
	    aGroups
	  }
	</div>
	</div>
      );
    }
  });

export {
    Pallet
};
