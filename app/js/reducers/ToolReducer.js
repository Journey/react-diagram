import {generateUUID, StoreHelper,DefaultValues} from "../Utility";
import {
    CREATE_SUB_PAPGER,DELETE_SUB_PAPGER,SWITCH_SUB_PAPER,SAVE_CHART
} from "../consts";


function syncToPapers(state){
    var _newPapers = Object.assign({},state.papers,{
	[state.selectedPaperId]:{
	    paperName:state.selectedPaperName,
	    svgProperties: state.svgProperties,
	    elements: state.elements,
	    links: state.links,
	    properties: state.properties
	}
    });
    return Object.assign({},state,{
	papers: _newPapers
    });
}

function setSelectedData(state,sPaperId,sPaperName,iPaperType/*1: sub page;2: 二级子界面*/){
    if(state.selectedPaperId === sPaperId){
	return state;
    }
    var selectedPaper = state.papers[sPaperId];
    if(selectedPaper){
	state = Object.assign({},state,{
	    selectedPaperId: sPaperId,
	    svgProperties: selectedPaper.svgProperties,
	    elements: selectedPaper.elements,
	    properties: selectedPaper.properties,
	    links: selectedPaper.links
	});
    } else {
	let newPapers = Object.assign({},state.papers,{
	    [sPaperId]:{
		key:sPaperId,
		paperName:sPaperName,
		paperType: iPaperType,
		svgProperties:{},
		elements: {},
		links: {},
		properties:{}
	    }
	});
	state = Object.assign({},state,{
	    selectedPaperId: sPaperId,
	    svgProperties: {},
	    elements: {},
	    properties: {},
	    links: {},
	    papers: newPapers
	});
    }
    return state;
}

const Toolbar = (state=DefaultValues.getDefaultState(),action) => {
    let _newPapers = null;
    switch(action.type){
    case CREATE_SUB_PAPGER:
	state = syncToPapers(state);
	state = setSelectedData(state,action.paperId,action.paperName,action.paperType);
	break;
    case DELETE_SUB_PAPGER:
	_newPapers = Object.assign({},state.papers);
	delete _newPapers[action.paperId];
	state = Object.assign();
	break;
    case SWITCH_SUB_PAPER:
	state = syncToPapers(state);
	state = setSelectedData(state,action.paperId);
	break;
    case SAVE_CHART:
	state = syncToPapers(state);
	break;
    default:
	break;
    }
    return state;
};

export default Toolbar;
