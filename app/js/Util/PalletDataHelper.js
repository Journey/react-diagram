/**
 * store the pallet data, is an array [group1, group2].
 * @returns {object} the getter/setter of the pallet data
 */
export const PalletDataHelper = (() => {
    var _palletData = null;
    return {
        get data(){
            return _palletData;
        },
        set data (aData){
            _palletData = aData;
        }
    };
})();
