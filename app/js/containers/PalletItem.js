import {connect} from 'react-redux';
import PalletItem from "../components/PalletItem.jsx";
import {canvasAction} from "../actions";

const mapStateToProps = (state) => {
    return {
	groups: state.groups
    };
};
const mapDispatchtoProps = (dispatch) => {
    return {
	onTest: (evt) => {
	    dispatch(canvasAction(evt.id));
	}
    };
};

export default connect(
    mapStateToProps,
    mapDispatchtoProps
)(Pallet);
