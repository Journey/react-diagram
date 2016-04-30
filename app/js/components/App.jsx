import React from 'react';
import Pallet from "../containers/Pallet";
import {Canvas,StaticCanvas} from "../containers/Canvas";
import Property from "../containers/Property";
import Toolbar from "../containers/Toolbar";
import {Tabs,StaticTabs} from "../containers/Tabs";

const App = () => (
  <div className="diagram">
    <div>
      <Toolbar />
    </div>
    <div className="diagram-component dia-flex">
      <div className="first-col dia-border">
	<Pallet />
      </div>
      <div className="mid-col dia-border">
	<Tabs />
	<Canvas />
      </div>
      <div className="lat-col dia-border">
	<Property />
      </div>
    </div>
  </div>
);

const StaticApp = () => (
  <div className="diagram">
    <div className="diagram-component">
	<StaticTabs />
	<StaticCanvas />
    </div>
  </div>
);

export {App,StaticApp};
