import React from 'react';
import Pallet from "../containers/Pallet";
import {Canvas,StaticCanvas,StaticSecondLevelCanvas} from "../containers/Canvas";
import Property from "../containers/Property";
import Toolbar from "../containers/Toolbar";
import {Tabs,StaticTabs} from "../containers/Tabs";

const App = () => (
  <div className="diagram">
    <div>
      <Toolbar />
    </div>
    <div className="diagram-component dia-flex">
      <div className="first-col">
	<Pallet />
      </div>
      <div className="mid-col dia-border">
	<Tabs />
	<Canvas />
      </div>
      <div className="last-col">
	<Property />
      </div>
    </div>
  </div>
);

const StaticApp = () => (
  <div className="diagram dia-static">
    <div className="diagram-component">
	<StaticTabs />
	<StaticCanvas />
    </div>
    <div className ="dia-sub-page-popup">
      <StaticSecondLevelCanvas />
    </div>
  </div>
);

export {App,StaticApp};
