import {DataModel} from "./DataModel";

class GroupModel extends DataModel{
    constructor(mData){
	//this._className = GroupMOdel.name;
	super(mData);
    };
    getGroupNameById(groupId){
	console.assert(this.data.has(groupId), `GroupModel.getGroupNameById, need a validate groupId`);
	var oGroupInfo = this.data.get(groupId);
	return oGroupInfo.groupName;
    };
};

export {GroupModel};
