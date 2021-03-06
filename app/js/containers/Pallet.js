import {connect} from 'react-redux';
import Pallet from "../components/Pallet.jsx";
import {palletElementDragStart,toggleExpand} from "../actions";
import {setDragContext,Position} from "../Utility";
import {TYPE_PALLETELEMENT} from "../consts";

const mapStateToProps = (state) => {
    return {
	groups: state.groups
    };
};
const mapDispatchtoProps = (dispatch) => {
    return {
	onPalletElementDragStart: (evt) => {
	    let elementId = evt.currentTarget.getAttribute("data-id");
	    setDragContext(evt, TYPE_PALLETELEMENT, elementId);
	    Position.logElementMistake(evt,evt.target,window,document);
	},
	toggleExpand: (evt)=> {
	    let groupId = evt.currentTarget.getAttribute("data-group-id");
	    dispatch( toggleExpand(parseInt(groupId)) );
	}
    };
};

export default connect(
    mapStateToProps,
    mapDispatchtoProps
)(Pallet);
