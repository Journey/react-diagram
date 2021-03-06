/**
 * @fileOverview Helper method to get the value of the diagram. combine the StoreHelper and DefaultValues,which used to get the initialed values for the canvas
 * @name DataHelper.js<Util>
 * @author your name <journey@gmail.com>
 * @license TBD
 */
import {
    StoreHelper
}
from "./StoreHelper";
import {
    DefaultValues
}
from "./DefaultValues";
import {
    PalletDataHelper
}
from "./PalletDataHelper";
let _papers;
var _palletGroup;
var _singleTypes;
var _reset_in_progress = false;
export const DataHelper = {
    get inResetting() {
        return _reset_in_progress;
    },
    set inResetting(bReset) {
        _reset_in_progress = bReset;
    },
    /**
     * get diagram papers. if already has store. if hasStore means the diagram have initialized. if not initalized and has _papers,means this is not a new diagram, otherwise this is a new diagram.
     * @returns {Object} the papers object.
     */
    get papers() {
        var oRet;
        if (_papers) {
            oRet = _papers;
        } else {
            oRet = DefaultValues.getPapers();
        }
        if (!this.inResetting && StoreHelper.hasStore()) {
            oRet = StoreHelper.getPapers();
        }
        return oRet;
    },

    /**
     * get the palletGroup data which listed on the left of the canvas
     * @returns {Array} the pallate group data.
     */
    get palletGroup() {
        if (_palletGroup) {
            return _palletGroup;
        }
        return [];
    },
    /**
     * set palletGroup data. store pallet group data into PalletDataHelper either.
     * @param {} aPalletGroup
     */
    set palletGroup(aPalletGroup) {
        PalletDataHelper.data = aPalletGroup;
        _palletGroup = aPalletGroup;
    },
    set papers(oPapers) {
        _papers = oPapers;
    },
    getPaper(paperId) {
	var oPapers = this.papers;
	//if this is the normal page
        if (paperId) {
            return oPapers[paperId];
        }
        return this.defaultSelectedPaper;
    },
    getSubpaper(paperKey){
	var oPapers = this.papers;
	//if this is the normal page
        if (oPapers[paperKey]) {
            return oPapers[paperKey];
        }
	//check if it is the subpage(via key))
	var paperUUID = Object.keys(oPapers)
	    .find((key)=>{
		return oPapers[key].key === paperKey;
	    });
	if(paperUUID){
	    return oPapers[paperUUID];
	}
	console.error(`the sub page ${paperKey} does not exsits!`);
        return null;
    },
    get elements() {
        return this.defaultSelectedPaper.elements;
    },
    get svgProperties() {
        return Object.assign({},this.defaultSelectedPaper.svgProperties);
    },
    get links() {
        return this.defaultSelectedPaper.links;
    },
    get properties() {
        return this.defaultSelectedPaper.properties;
    },
    get selectedPaperId() {
	if(!this.inResetting && StoreHelper.hasStore()){
	    return StoreHelper.getSelectedPaperId();
	}
        return this.defaultSelectedPaper.uuid;
    },
    get operator() {
        return DefaultValues.getOperator();
    },
    /**
     * get the default selected paper. the paper which has the lowest order.
     * @returns {_Object} _paper the selected paper
     */
    get defaultSelectedPaper() {
        var papers = this.papers;
        var _paper;
        var paperKeys = Object.keys(this.papers);
        Object.keys(this.papers)
            .reduce((pre, curObj) => {
                var curPaper = papers[curObj];
                if (pre > curPaper.order) {
                    _paper = curPaper;
                    return curPaper.order;
                }
                return pre;
            }, 10000000);
        return _paper;
    },
    set signalTypes(aTypes) {
        _singleTypes = aTypes;
    },
    get signalTypes() {
        if (!_singleTypes) {
            return DefaultValues.signalTypes;
        }
        return _singleTypes;
    },
    get secondLevelPage() {
        //todo:: get value from storehelper first
        return DefaultValues.secondLevelPage;
    },
    getPaperProperties() {
	//todo:: get value from storehelper first
	return DefaultValues.paperProperties;
    },
    getPaperInfo(paperUUID){
	var oPaper = this.getPaper(paperUUID);
	if(oPaper){
	    return {
		paperType: oPaper.paperType,
		paperName: oPaper.paperName,
		bindingId: oPaper.key
	    };
	}
	console.log(`DataHelper.getPaperInfo(${paperUUID})) not find`);
	return null;
    }
};
