"use strict";
import {GroupModel} from '../../app/js/GroupModel';
import {AtomModel} from '../../app/js/AtomModel';
import {PalletModel} from '../../app/js/PalletModel';
function groupData(){
  var map = new Map();
  map.set("groupId1",{groupName:"group name 1"});
  map.set("groupId2",{groupName:"group name 2"});
  return map;
};

function jsonGroupData(){
    return {
	"groupId1":{"groupName": "group name 1"},
	"groupId2":{"groupName": "group name 2"}
    };
}
function jsonAtomData(){
    return atomData();
}

function atomData(){
  var atomData = {
    "item-id-1":{
      name:"item name 1",
      width:50,
      height: 50,
      groupId: "groupId1",
      statusList:[{
	id:"status-1",
	name:"status name 1",
	image:"css/1.jpg",
	isDefault:true
      },
	{
	  id:"status-2",
	  name:"status name 2",
	  image:"css/2.jpg",
	  isDefault:false
	}]
    },
    "item-id-2":{
      name:"item name 2",
      width:50,
      height: 50,
      groupId: "groupId1",
      statusList:[{
	id:"status-3",
	name:"status name 2",
	image:"css/3.jpg",
	isDefault:true
      }]
    },
    "item-id-3":{
      name:"item name 3",
      width:50,
      height: 50,
      groupId: "groupId2",
      statusList:[{
	id:"status-3",
	name:"status name 3",
	image:"css/4.jpg",
	isDefault:true
      }]
    }
  };
  return atomData;
};
function groupModel(){
  return new GroupModel( groupData() );
}
function atomModel(){
  return new AtomModel( atomData() );
}

var oGroupModel = groupModel();
var oAtomModel = atomModel();
var oPalletModel = new PalletModel(oAtomModel, oGroupModel);

export {jsonGroupData,jsonAtomData,oGroupModel, oAtomModel, oPalletModel};
