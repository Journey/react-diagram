import {connect} from 'react-redux';
import Pallet from "../components/Pallet.jsx";
import {} from "../actions";
import {} from "../Utility";
import {} from "../consts";

const mapStateToProps = (state) => {
    return {
	selectedPaperId: state.selectedPaperId,
	selectedPaperName: state.selectedPaperName,
	svgProperties: state.svgProperties,
	elements: state.element,
	properties:state.properties,
	links: state.links,
	operator: state.operator,
	papers: state.papers
    };
};
const mapDispatchtoProps = (dispatch) => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchtoProps
)(Pallet);
