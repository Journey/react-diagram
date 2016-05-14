import {connect} from 'react-redux';
import {generateUUID} from "../Utility";
import {StoreHelper} from "../Util/StoreHelper";
import {DataHelper} from "../Util/DataHelper";
import {Tabs as TabsView,StaticTabs as StaticTabsView} from "../components/Tabs.jsx";
import {zoomIn,zoomOut,redo,undo,createSubPage,deleteSubPage,switchSubPage,selectCanvas} from "../actions";

const mapStateToProps = (state) => {
    return {
	selectedPaperId: state.selectedPaperId,
	papers: state.papers
    };
};
const mapDispatchtoProps = (dispatch) => {
    return {
	deletePaper: (event) => {
	    if(StoreHelper.isLastPaper()){
		return;
	    }
	    var paperId = event.target.parentElement.getAttribute("data-paper-id");
	    dispatch(deleteSubPage(paperId));
	    var paper = DataHelper.getPaper();  ;
	    dispatch(switchSubPage(paper));
	    dispatch(selectCanvas(paper.svgProperties));
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



