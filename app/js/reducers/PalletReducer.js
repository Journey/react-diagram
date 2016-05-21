import {DataHelper} from "../Util/DataHelper";
import {TOGGLE_EXPAND} from "../consts";
/**
 * the data of the pallet component
 * @param {Object} state the data of the pallet element includes group infomation
 * @param {null} action no action
 * @returns {Object} the pallet element infomation
 */
const groups = (state = DataHelper.palletGroup,action) => {
    switch(action.type){
    case TOGGLE_EXPAND:
	return state.map((oGroup)=>{
	    var isExpand = false;
	    if(action.data === oGroup.id){
		isExpand = !oGroup.isExpand;
	    }
	    return Object.assign({},oGroup,{isExpand: isExpand});
	});
	break;
    }
    return state;;
};
export default groups;
