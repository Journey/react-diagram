import React from 'react';
import {render} from "react-dom";
import {Provider} from "react-redux";
import {createStore} from "redux";
import componentReducers from "./reducers";
import App from "./components/App.jsx";
import {StoreHelper,ApiSingletone} from "./Utility";
ApiSingletone.Render = function(domId){
    let store = createStore(componentReducers);
    StoreHelper.setStore(store);;
    render(
	<Provider store={store}>
        <App />
	</Provider>,
	document.getElementById(domId)
    );
};

