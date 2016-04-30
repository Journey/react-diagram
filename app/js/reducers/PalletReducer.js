import {PalletData,ApiSingletone} from "../Utility";
/**
 * the data of the pallet component
 * @param {Object} state the data of the pallet element includes group infomation
 * @param {null} action no action
 * @returns {Object} the pallet element infomation
 */
const groups = (state,action) => {
    //comes from Utilit.ApiSingletone.palletGroup
    PalletData.set(ApiSingletone.palletGroup);
    return ApiSingletone.palletGroup;
};
export default groups;
