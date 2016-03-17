import {oPalletModel} from "../../__tests__/data/rawdata.js";
import {Pallet} from "../../app/js/pallet.jsx";
import {Canvas} from "../../app/js/canvas.jsx";

var aGroups = [
  {
    "title":"微网",
    "items":[
      {
	"src":"css/1.jpg",
	"id":"1",
	"name":"单晶硅光伏",
	"type":"micro"
      },
      {
	"src":"css/2.jpg",
	"id":"2",
	"name":"多晶硅光伏",
	"type":"micro"
      }
    ]
  },
  {
    "title":"光热",
    "items":[
      {
	"src":"css/3.jpg",
	"id":"1",
	"name":"储油罐",
	"type":"micro"
      },
      {
	"src":"css/4.jpg",
	"id":"2",
	"name":"绑点",
	"type":"micro"
      }
    ]
  }
];
ReactDOM.render(
  <div>
    <Pallet model={oPalletModel}></Pallet>
    <Canvas></Canvas>
  </div>,
  document.getElementById('example'));
