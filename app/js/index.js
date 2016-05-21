import React from 'react';
import {render} from "react-dom";
import {Provider} from "react-redux";
import {createStore} from "redux";
import componentReducers from "./reducers";
import {App,StaticApp} from "./components/App.jsx";
import {StoreHelper} from "./Util/StoreHelper";
import {API} from "./API";
import {DataHelper} from "./Util/DataHelper";
import {GridHelper} from "./Util/gridHelper";
import {transformSignalTypes,transfromPalletGroupData,transformPapers} from "./Adapter/Data";
API.init = function(aPalletGroup,aSingleTypes,domId){
    //DataHelper.papers = transformPapers(oPapers);
    DataHelper.palletGroup = transfromPalletGroupData(aPalletGroup);
    DataHelper.signalTypes = transformSignalTypes(aSingleTypes);
    GridHelper.init();
    let store = createStore(componentReducers);
    StoreHelper.setStore(store);
    return {
	dynamic: function(oPapers,sDomId){
	    render(
		    <Provider store={store}>
		    <App />
		    </Provider>,
		document.getElementById(sDomId?sDomId : domId)
	    );
	    API.reset(oPapers);
	},
	static: function(oPapers,sDomId){
	    render(
		    <Provider store={store}>
		    <StaticApp />
		    </Provider>,
		document.getElementById(sDomId? sDomId : domId)
	    );
	    API.reset(oPapers);
	}
    };
    
};
