import React from 'react';
import {render} from "react-dom";
import {Provider} from "react-redux";
import {createStore} from "redux";
import componentReducers from "./reducers";
import App from "./components/App";

let store = createStore(componentReducers);

function init(){
  render(
    <Provider store={store}
      <App />
    </Provider>,
    document.getElementById("diagram")
  );
}
