import {generateUUID, StoreHelper} from "../Utility";
import {
    CREATE_SUB_PAPGER,DELETE_SUB_PAPGER,SWITCH_SUB_PAPER,SAVE_CHART
} from "../consts";

let const _selectedPageId = generateUUID();
function _getDefaultState(){
    return {
	selectedPaperId:_selectedPageId,
	selectedPaperName:"",
	svgProperties:{},
	elements:{},
	properties:{},
	links:{},
	operator:{},
	papers:{
	    [_selectedPageId]: {
		paperName:"",
		svgProperties:{},
		elements: {},
		links: {},
		properties:{}
	    }
	}
    };
}

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

function setSelectedData(state,sPaperId,sPaperName){
    if(state.selectedPaperId === sPaperId){
	return state;
    }
    var selectedPaper = state.papers[sPaperId];
    if(selectedPaper){
	state = Object.assign({},state,{
	    selectedPaperId: sPaperId,
	    selectedPaperName: selectedPaper.paperName,
	    svgProperties: selectedPaper.svgProperties,
	    elements: selectedPaper.elements,
	    properties: selectedPaper.properties,
	    links: selectedPaper.links
	});
    } else {
	state = Object.assign({},state,{
	    selectedPaperId: sPaperId,
	    selectedPaperName: sPaperName,
	    svgProperties: {},
	    elements: {},
	    properties: {},
	    links: {}
	});
    }
    return state;
}

const Global = (state=_getDefaultState(),action) => {
    let _newPapers = null;
    switch(action.type){
    case CREATE_SUB_PAPGER:
	state = syncToPapers(state);
	state = setSelectedData(state,action.paperId,action.paperName);
	break;
    case DELETE_SUB_PAPGER:
	_newPapers = Object.assign({},state.papers);
	delete _newPapers[action.paperId];
	_newPapers.keys()[0]
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

export default Global;
