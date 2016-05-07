import {DataHelper} from "./Util/DataHelper";
import {StoreHelper} from "./Util/StoreHelper";
/**
 * ApiSingletone: used to store global data of the Component- e.g palletGroup,papers
 */
export const API = (() => {
    var _fRender = null;
    var _fStaticRender = null;
    var _fUpdateBindingData = null;
    let ret = {
        set Render(fRender) {
            _fRender = fRender;
        },
        get Render() {
            return _fRender;
        },
        set StaticRender(fRender) {
            _fStaticRender = fRender;
        },
        get StaticRender() {
            return _fStaticRender;
        },
        set UpdateBindingData(fUpdate) {
            _fUpdateBindingData = fUpdate;
        },
        get UpdateBindingData() {
            return _fUpdateBindingData;
        },
        get dispatch() {
            return StoreHelper.getDispatch();
        }
    };
    window.REACTDiagram = ret;
    return ret;
})();
