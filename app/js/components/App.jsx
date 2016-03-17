import React from 'react';
import Pallet from "../containers/Pallet";
import Canvas from "../containers/Canvas";
import Property from "../containers/Property";

const App = () => (
  <div className="diagram-component">
    <div className="first-col">
      <Pallet />
    </div>
    <div className="mid-col">
      <Canvas />
    </div>
    <div className="lat-col">
      <Property />
    </div>
   </div>
);

export default App;
