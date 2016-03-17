/**
 * @grid lines for canvas
 * @name LineForCanvas.jsx
 * @author 
 * @license 
 */
import {generateUUID} from "./uuid";
var Grid = React.createClass({
  getLines: function(){
    var width = this.props.width;
    var height = this.props.height;
    var gridSize = this.props.gridSize;
    var lines = [];
    //generat vertical lines
    for(let inx =1, count = width/gridSize; inx < count; inx++) {
      let line = `M${inx * gridSize} 0 v${height} Z`;
      lines.push(
	<path key={generateUUID()} d={line} className="grid-line grid-v-line"/>
      );
    }
    //generate horizontal lines
    for (let inx = 1, count = height/gridSize; inx < count; inx++){
      let line = `M0 ${inx * gridSize} h${width}`;
      lines.push(
	<path key={generateUUID()} d={line} className="grid-line grid-h-line"/>
      );
    }
    return lines;
  },
  getPoints: function(){
    var width = this.props.width;
    var height = this.props.height;
    var gridSize = this.props.gridSize;
    var points = [];
    //generat vertical lines
    for(let inx =1, count = width/gridSize; inx < count; inx++) {
      let x = inx * gridSize-0.5;
      for (let inx = 1, count = height/gridSize; inx < count; inx++){
	let y = inx * gridSize-0.5;
	let translate = `translate(${x},${y})`;
	points.push(
	  <circle key={generateUUID()} className="port" opcity="0.9" fill="#f1c40f" transform={translate} r="1"></circle>
	);
      }
    }
    return points;
  },
  render: function() {
    return (
      <g className="ca-grids">
	{this.getLines()}
      </g>
    );
  }
});

export {Grid};
