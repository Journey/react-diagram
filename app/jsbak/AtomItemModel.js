/**
 * @the data model class for the yuxin js, will provide variouse data formates for the application
 * @name AtomModel.js
 * @author 
 * @license 
 */
import {DataModel} from "./DataModel";
import {AtomItemStatusModel} from "./AtomItemStatusModel";

class AtomItemModel{
  constructor(id,name,width,height,groupId,aStatusModels){
    //[this.id,this._name,this.width,this.height,this._groupId] = [...arguments];
    this.id = id;
    this._name = name;
    this.width = width;
    this.height = height;
    this._groupId = groupId;
	this.mStatusModels = this._translateStatusFromArrayToMap(aStatusModels);
    };
    _translateStatusFromArrayToMap(aStatusModels){
	var _mRet = new Map();
	aStatusModels.forEach((oStatus)=>{
	    let [id,name,image,isDefault] = [oStatus.id,oStatus.name,oStatus.image,oStatus.isDefault];
	    _mRet.set(id, new AtomItemStatusModel(oStatus.id,name,image,isDefault));
	});
	return _mRet;
    };
  get defaultStatus(){
    var that = this;
	if(this._defaultStatus === undefined){
	  this.mStatusModels.forEach((value)=>{
		if(value.isDefault){
		    that._defaultStatus = value;
		}
	    });
	};
	console.assert(this._defaultStatus !== undefined,`AtomItemModel-${this.name}: does not have default status`);
	return this._defaultStatus;
    };
    isDefaultStatus(statusId){
	console.log(this.mStatusModels.has(statusId),`AtomItemModel:status id-${statusId} does not exist`);
	return this.mStatusModels.get(statusId).isDefault; 
    };
    get groupId(){
	return this._groupId;
    };
    get name(){
	return this._name;
    };
    get defaultStatusImage(){
	return this.defaultStatus.image;
    };
    get defaultStatusId(){
	return this.defaultStatus.id;
    };
    getStatusImage(statusId){
	console.assert(this.mStatusModels.has(statusId),`AtomItemModel: status id -${statusId} does not exsited`);
	return this.mStatusModels.get(statusId).image;
    };
    getStatusName(statusId){
	console.assert(this.mStatusModels.has(statusId),`AtomItemModel: status id -${statusId} does not exsited`);
	return this.mStatusModels.get(statusId).name;
    };
};

export {AtomItemModel};
