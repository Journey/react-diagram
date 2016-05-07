import {DataHelper} from "../Util/DataHelper";
/**
 * the data of the pallet component
 * @param {Object} state the data of the pallet element includes group infomation
 * @param {null} action no action
 * @returns {Object} the pallet element infomation
 */
const groups = (state,action) => {
    return DataHelper.palletGroup;
};
export default groups;
