/**
 * @the data model class for the yuxin js, will provide variouse data formates for the application
 * @name AtomModel.js
 * @author 
 * @license 
 */
import {DataModel} from "./DataModel";
import {AtomItemModel} from "./AtomItemModel";

class AtomModel extends DataModel{
  /** mData - data format:
   {
    id: AtomItemModelInstance
   }
   */
    constructor(oData){
	//this._className = AtomModel.name;
	super(oData);
    };
    _processData(oData){
	//translate json data to Map model data
	var _mData = new Map();
	Object.keys(oData).forEach(((key)=>{
	    let curItem = oData[key];
	    let atomItemModel = new AtomItemModel(key,curItem.name,curItem.width,curItem.height,curItem.groupId,curItem.statusList);
	    _mData.set(key,atomItemModel);
	}).bind(this));
	return _mData;
    };
    
    getDefaultImageById(id){
	console.assert(this.data.has(id),`AtomModel:${id} not exsits`);
	let item = this.data.get(id);
	return item.defaultStatusImage;

    };
    getImageByIdAndStatus(id,statusId){
	console.assert(this.data.has(id),`AtomModel:item id -${id} does not exsited`);
	let item = this.data.get(id);
	return item.getStatusImage(statusId);
    };
    getItemNameById(id){
	let item = this.data.get(id);
	return item.name;
    };
    getGroupIdByItemId(itemId){
	console.assert(this.data.has(itemId),`AtomModel: item id - ${itemId} does not exsit`);
	return this.data.get(itemId).groupId;
	
    };
    getDefaultStatusById(itemId){
	console.assert(this.data.has(itemId),`AtomModel-${itemId} does not exsit`);
	return this.data.get(itemId).defaultStatus;
    };
    getImageSizeById(itemId){
	console.assert(this.data.has(itemId),`AtomModel-${itemId} does not exsit`);
	var item = this.data.get(itemId);
	return {
	    width: item.width,
	    height: item.height
	};
    };
};

export {AtomModel};
