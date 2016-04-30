import {generateUUID, StoreHelper, DefaultValues,ApiSingletone} from "../Utility";
import {
    CREATE_SUB_PAPGER,DELETE_SUB_PAPGER,SWITCH_SUB_PAPER,SAVE_CHART
} from "../consts";

const papers = (state = ApiSingletone.papers, action) => {
    switch(action.type){
    case CREATE_SUB_PAPGER:
	state = Object.assign({},state,{
	    [action.paperId]: DefaultValues.generatePaper(action.uuid,action.paperId,action.paperName,action.paperType)
	});
	break;
    case DELETE_SUB_PAPGER:
	state = Object.assign({},state);
	delete state[action.paperId];
	break;
    }
    return state;
};

const selectedPaperId = (state= ApiSingletone.getDefaultSelectedPaper().key,action) => {
    switch(action.type){
    case SWITCH_SUB_PAPER:
	return action.paper.key;
    }
    return state;
};

export {papers, selectedPaperId};
