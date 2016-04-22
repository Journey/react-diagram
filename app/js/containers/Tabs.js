import {connect} from 'react-redux';
import {generateUUID,StoreHelper} from "../Utility";
import Tabs from "../components/Tabs.jsx";
import {zoomIn,zoomOut,redo,undo,createSubPage,deleteSubPage,switchSubPage} from "../actions";

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
	    var paper = StoreHelper.getSelectedPaper();
	    dispatch(switchSubPage(paper));
	},
	clickPaper: (event)=>{
	    var paperId = event.target.parentElement.getAttribute("data-paper-id");
	    if(paperId){
		var paper = StoreHelper.getSelectedPaper(paperId);
		StoreHelper.storeData();
		dispatch(switchSubPage(paper));
	    }
	},
	onDeleteSubPage: (event) => {
	    dispatch(deleteSubPage());
	}
    };
};

export default connect(
    mapStateToProps,
    mapDispatchtoProps
)(Tabs);


