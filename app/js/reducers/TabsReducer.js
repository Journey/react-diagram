import {generateUUID, StoreHelper, DefaultValues} from "../Utility";
import {DataHelper} from "../Util/DataHelper";
import {papers as papersHelper} from "../Util/PaperHelper";
import {
    CREATE_SUB_PAPGER,DELETE_SUB_PAPGER,SWITCH_SUB_PAPER,SAVE_CHART,UI_DATA_UPDATE,UI_STATUS_UPDATE,RESET_DIAGRAM,SAVE_PAGE_INFO
} from "../consts";

const papers = (state = DataHelper.papers, action) => {
    switch(action.type){
    case CREATE_SUB_PAPGER:
	state = Object.assign({},state,{
	    [action.uuid]: DefaultValues.generatePaper(action.uuid,action.paperId,action.paperName,action.paperType)
	});
	break;
    case DELETE_SUB_PAPGER:
	state = Object.assign({},state);
	delete state[action.paperId];
	break;
    /*case UI_DATA_UPDATE:
	state = papersHelper.updatePlaceholderValues(action.data);
	break;
    case UI_STATUS_UPDATE:
	state = papersHelper.updateElementsStatus(action.data);
	break;*/
    case RESET_DIAGRAM:
	state = Object.assign({},DataHelper.papers);
	break;
    case SAVE_PAGE_INFO:
	var selectedPaper = state[DataHelper.selectedPaperId];
	selectedPaper = Object.assign({},selectedPaper,{
	    paperName: action.data.paperName,
	    key: action.data.bindingId ? action.data.bindingId : selectedPaper.uuid
	});
	state = Object.assign({},state,{
	    [selectedPaper.uuid]:selectedPaper
	});
	break;
    }
    return state;
};

const selectedPaperId = (state= DataHelper.defaultSelectedPaper.uuid,action) => {
    switch(action.type){
    case SWITCH_SUB_PAPER:
	return action.paper.uuid;
    case RESET_DIAGRAM:
	return DataHelper.defaultSelectedPaper.uuid;
    }
    return state;
};

export {papers, selectedPaperId};
