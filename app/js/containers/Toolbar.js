import {connect} from 'react-redux';
import Toolbar from "../components/Toolbar.jsx";
import {zoomIn,zoomOut,redo,undo,createSubPage,deleteSubPage} from "../actions";


const mapStateToProps = (state) => {
    return state;
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
	onCreateSubPage: () => {
	    dispatch(createSubPage());
	},
	onDeleteSubPage: () => {
	    dispatch(deleteSubPage());
	},
	onSave: (event) => {
	    
	}
    };
};

export default connect(
    mapStateToProps,
    mapDispatchtoProps
)(Toolbar);


