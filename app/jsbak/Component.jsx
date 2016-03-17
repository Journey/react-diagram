/**
 * The Canvas Component. is a drop zone which allowed drop an `pa-element`
 * @param {object} yuxin - global object
 * @return the Element Component
 */
"use strict";
import {generateUUID} from "./uuid";
import {Store} from "./Store";
import {Pallet} from "./pallet.jsx";
import {Canvas} from "./canvas.jsx";
import {Property} from "./property.jsx";
var Component = React.createClass({
  componentDidMount: function(){
    //Store.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    //Store.removeChangeListener(this._onChange);
  },
  render: function(){
    return (
      <div className="diagram-component">
	<div className="first-col">
	  <Pallet model={this.props.model.palletModel}></Pallet>
	</div>
	<div className="mid-col">
	  <Canvas
		  model={this.props.model.canvasModel}
		  getElementImageById={this.props.model.getElementDefaultImageById.bind(this.props.model)}
		  getElementSizeById={this.props.model.getElementImageSizeById.bind(this.props.model)}>
	  </Canvas>
	</div>
	<div className="last-col">
	  <Property model={this.props.model.propertyModel}></Property>
	</div>
      </div>
    );
  }
});

export {Component};
