import {DataHelper} from "./Util/DataHelper";
import {StoreHelper} from "./Util/StoreHelper";
import {callbacks} from "./ext/callbacks";
import {transformBindingData, transformElementsStatus, transformPapers} from "./Adapter/Data";
import {updateBindingData,updateStatus, resetDiagram} from "./actions";
/**
 * ApiSingletone: used to store global data of the Component- e.g palletGroup,papers
 */
export const API = (() => {
    var _fRender = null;
    var _fStaticRender = null;
    let ret = {
	/**
	 * Render canvas in editor model
	 * @param {} fRender
	 */
        set Render(fRender) {
            _fRender = fRender;
        },
        get Render() {
            return _fRender;
        },
	/**
	 * Render canvas in display only model
	 * @param {} fRender
	 */
        set StaticRender(fRender) {
            _fStaticRender = fRender;
        },
        get StaticRender() {
            return _fStaticRender;
        },
	/**
	 * update place holder values
	 * @param {Array} aData the binding data 
	 */
	updateBindingData(aData){
	    if(aData && aData.length > 0){
		var oData = transformBindingData(aData);
		this.dispatch(updateBindingData(oData));
	    }
	},
	/**
	 * update the elememt status, usually change the image of the element
	 * @param {} fRender
	 */
	updateElementsStatus(aData){
	    if(aData && aData.length > 0){
		var oData = transformElementsStatus(aData);
		this.dispatch(updateStatus(oData));
	    }
	},
        get dispatch() {
            return StoreHelper.getDispatch();
        },
	registerSaveDiagram(fSave){
	    callbacks.saveDiagram = fSave;
	},
	reset(oPapers){
	    oPapers = transformPapers(oPapers);
	    DataHelper.inResetting = true;
	    DataHelper.papers = oPapers;
	    this.dispatch(resetDiagram(oPapers));
	    DataHelper.inResetting = false;
	}
    };
    window.REACTDiagram = ret;
    return ret;
})();
