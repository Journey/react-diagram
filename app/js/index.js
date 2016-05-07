import React from 'react';
import {render} from "react-dom";
import {Provider} from "react-redux";
import {createStore} from "redux";
import componentReducers from "./reducers";
import {App,StaticApp} from "./components/App.jsx";
import {StoreHelper} from "./Util/StoreHelper";
import {API} from "./API";
import {DataHelper} from "./Util/DataHelper";
API.Render = function(aPalletGroup,oPapers,domId){
    DataHelper.papers = oPapers;
    DataHelper.palletGroup = aPalletGroup;
    let store = createStore(componentReducers);
    StoreHelper.setStore(store);;
    render(
	<Provider store={store}>
        <App />
	</Provider>,
	document.getElementById(domId)
    );
};
API.StaticRender = function(aPalletGroup,oPapers,domId){
    DataHelper.papers = oPapers;
    DataHelper.palletGroup = aPalletGroup;
    let store = createStore(componentReducers);
    StoreHelper.setStore(store);;
    render(
	<Provider store={store}>
        <StaticApp />
	</Provider>,
	document.getElementById(domId)
    );
};

