import React from 'react';
import {render} from "react-dom";
import {Provider} from "react-redux";
import {createStore} from "redux";
import componentReducers from "./reducers";
import {App,StaticApp} from "./components/App.jsx";
import {StoreHelper} from "./Util/StoreHelper";
import {API} from "./API";
import {DataHelper} from "./Util/DataHelper";
import {transformSignalTypes,transfromPalletGroupData,transformPapers} from "./Adapter/Data";
API.Render = function(aPalletGroup,oPapers,aSingleTypes,domId){
    DataHelper.papers = transformPapers(oPapers);
    DataHelper.palletGroup = transfromPalletGroupData(aPalletGroup);
    DataHelper.signalTypes = transformSignalTypes(aSingleTypes);
    let store = createStore(componentReducers);
    StoreHelper.setStore(store);;
    render(
	<Provider store={store}>
        <App />
	</Provider>,
	document.getElementById(domId)
    );
};
API.StaticRender = function(aPalletGroup,oPapers,aSingleTypes,domId){
    DataHelper.papers = transformPapers(oPapers);
    DataHelper.palletGroup = transfromPalletGroupData(aPalletGroup);
    DataHelper.signalTypes = transformSignalTypes(aSingleTypes);
    let store = createStore(componentReducers);
    StoreHelper.setStore(store);;
    render(
	<Provider store={store}>
        <StaticApp />
	</Provider>,
	document.getElementById(domId)
    );
};

