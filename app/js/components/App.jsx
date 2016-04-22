import React from 'react';
import Pallet from "../containers/Pallet";
import Canvas from "../containers/Canvas";
import Property from "../containers/Property";
import Toolbar from "../containers/Toolbar";
import Tabs from "../containers/Tabs";

const App = () => (
  <div className="diagram">
    <div>
      <Toolbar />
    </div>
    <div className="diagram-component">
      <div className="first-col">
	<Pallet />
      </div>
      <div className="mid-col">
	<Tabs />
	<Canvas />
      </div>
      <div className="lat-col">
	<Property />
      </div>
    </div>
  </div>
);

export default App;
