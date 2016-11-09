import {connect} from 'react-redux';
import {generateUUID} from "../Utility";
import {StoreHelper} from "../Util/StoreHelper";
import {DataHelper} from "../Util/DataHelper";
import {Tabs as TabsView,StaticTabs as StaticTabsView} from "../components/Tabs.jsx";
import {zoomIn,zoomOut,redo,undo,createSubPage,deleteSubPage,switchSubPage,selectCanvas} from "../actions";
function _getDeletepageConfirmDialog() {
    return $("#react-diagram-delete-page-confirm");
}
const mapStateToProps = (state) => {
    return {
	selectedPaperId: state.selectedPaperId,
	papers: state.papers
    };
};
const mapDispatchtoProps = (dispatch) => {
    var _storedPageId = null;
    return {
	onDeletePressed: (event) => { //open confirm dialog
	    if(StoreHelper.isLastPaper()){
		return;
	    }
            var overlayEle = _getDeletepageConfirmDialog();
	    _storedPageId = event.target.parentElement.getAttribute("data-paper-id");
	    $(overlayEle).modal('show');
	},
	hideDeleteConfirm: () => {
	    _getDeletepageConfirmDialog().modal("hide");
	},
	deletePaper: (event) => {
	    dispatch(deleteSubPage(_storedPageId));
	    var paper = DataHelper.getPaper();
	    dispatch(switchSubPage(paper));
	    dispatch(selectCanvas(paper.svgProperties));
	    _getDeletepageConfirmDialog().modal("hide");
	},
	clickPaper: (event)=>{
	    var paperId = event.target.parentElement.getAttribute("data-paper-id");
	    if(paperId){
		var paper = DataHelper.getPaper(paperId);
		StoreHelper.storeData();
		dispatch(switchSubPage(paper));
		/*
		dispatch(selectCanvas(paper.svgProperties));
		 */
	    }
	},
	onDeleteSubPage: (event) => {
	    dispatch(deleteSubPage());
	}
    };
};

const Tabs = connect(
    mapStateToProps,
    mapDispatchtoProps
)(TabsView);

const StaticTabs = connect(
    mapStateToProps,
    mapDispatchtoProps
)(StaticTabsView);

export {Tabs,StaticTabs};



