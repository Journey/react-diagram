import {connect} from 'react-redux';
import {generateUUID, StoreHelper} from "../Utility";
import {papers as Papers} from "../Util/PaperHelper";
import {callbacks} from "../ext/callbacks";
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
	    var paperType = parseInt(typeEle.value);
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
		type: paperType,
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
	    var oValideResult = Papers.validateData();
	    if(oValideResult.isValide){
		console.log(JSON.stringify(StoreHelper.getPapers(),function(key,value){
		    return value;
		}));
		oValideResult.data = StoreHelper.getPapers();
		console.log(StoreHelper.getPapers());;
	    } else {
		console.log("papgers failed validation");
		console.log(oValideResult);
	    }
	    
	    callbacks.saveDiagram && callbacks.saveDiagram(oValideResult);
	}
    };
};

export default connect(
    mapStateToProps,
    mapDispatchtoProps
)(Toolbar);


