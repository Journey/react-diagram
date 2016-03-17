import {jsonGroupData, jsonAtomData} from "../../__tests__/data/rawdata.js";
import {ComponentModel} from "../../app/js/ComponentModel.js";
import {Component} from "../../app/js/Component.jsx";
var componentModel = new ComponentModel(jsonAtomData(), jsonGroupData());
ReactDOM.render(<Component model={componentModel}/>,
  document.getElementById('example'));
