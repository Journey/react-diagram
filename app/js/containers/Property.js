import {connect} from 'react-redux';
import Property from "../components/Property.jsx";
import {propertyAction} from "../actions";

const mapStateToProps = (state) => {
    return {
	
    };
};
const mapDispatchtoProps = (dispatch) => {
    return {
	onTest: (evt) => {
	    dispatch(propertyAction(evt.id));
	}
    };
};

export default connect(
    mapStateToProps,
    mapDispatchtoProps
)(Property);

