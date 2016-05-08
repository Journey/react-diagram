import {generateUUID, StoreHelper, DefaultValues} from "../Utility";
import {DataHelper} from "../Util/DataHelper";
import {papers as papersHelper} from "../Util/PaperHelper";
import {
    CREATE_SUB_PAPGER,DELETE_SUB_PAPGER,SWITCH_SUB_PAPER,SAVE_CHART,UI_DATA_UPDATE,UI_STATUS_UPDATE
} from "../consts";

const papers = (state = DataHelper.papers, action) => {
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
    case UI_DATA_UPDATE:
	state = papersHelper.updatePlaceholderValues(action.data);
	break;
    case UI_STATUS_UPDATE:
	state = papersHelper.updateElementsStatus(action.data);
	break;
    }
    return state;
};

const selectedPaperId = (state= DataHelper.defaultSelectedPaper.key,action) => {
    switch(action.type){
    case SWITCH_SUB_PAPER:
	return action.paper.key;
    }
    return state;
};

export {papers, selectedPaperId};
