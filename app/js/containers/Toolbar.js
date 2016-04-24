import {connect} from 'react-redux';
import {generateUUID, StoreHelper} from "../Utility";
import Toolbar from "../components/Toolbar.jsx";
import {zoomIn,zoomOut,redo,undo,createSubPage,deleteSubPage} from "../actions";

const mapStateToProps = (state) => {
    return {
	selectedPaperId: state.selectedPaperId,
	papers: state.papers
    };
};
const mapDispatchtoProps = (dispatch) => {
    return {
	onZoomIn: (evt) => {
	    dispatch(zoomIn());
	},
	onZoomOut: () => {
	    dispatch(zoomOut());
	},
	onRedo: (event) => {
	    dispatch(redo());
	},
	onUndo: (event) => {
	    dispatch(undo());
	},
	onCreateSubPage: (event) => {
	    var containerEle = event.target.parentElement.parentElement;
	    var overlayEle = containerEle.querySelector("div.dia-overlay");
	    overlayEle.style.display = "";
	},
	onSaveSubPage: (event) => {
	    var subCreateEle = event.target.parentElement.parentElement.parentElement;
	    var typeEle = subCreateEle.querySelector("select");
	    var nameEle = subCreateEle.querySelector("input[name=name]");
	    var idEle = subCreateEle.querySelector("input[name=identify]");
	    var name = nameEle.value;
	    if(!name){
		return;
	    }
	    var id = idEle.value;
	    var uuid = generateUUID();
	    if(!id){
		id = uuid;
	    }
	    
	    dispatch(createSubPage({
		name: name,
		type: typeEle.value,
		key: id,
		uuid: uuid
	    }));
	    subCreateEle.style.display = "none";
	    nameEle.value = "";
	    idEle.value = "";
	},
	onCancelSubPage: (event) => {
	    var overlayEle = event.target.parentElement.parentElement.parentElement;
	    overlayEle.style.display = "none";
	},
	onSave: (event) => {
	    StoreHelper.storeData();
	    //console.log(JSON.stringify(StoreHelper.getPapers()));
	    console.log(StoreHelper.getPapers());
	}
    };
};

export default connect(
    mapStateToProps,
    mapDispatchtoProps
)(Toolbar);


