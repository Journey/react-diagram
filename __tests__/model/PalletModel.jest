"use strict";
jest.dontMock('../../app/js/DataModel');
jest.dontMock('../../app/js/AtomItemModel');
jest.dontMock('../../app/js/AtomItemStatusModel');
jest.dontMock('../../app/js/AtomModel');
jest.dontMock('../../app/js/GroupModel');
jest.dontMock('../../app/js/PalletModel');
const model = require('../../app/js/PalletModel');
const gModel = require('../../app/js/GroupModel');
const aModel = require("../../app/js/AtomModel");

describe("PalletModel Test",()=>{
  var ins = prepare();
  it("test constructor",()=>{
    expect(ins.data instanceof Map).toBe(true);
  });
  it("has two groups",()=>{
    expect(ins.data.size).toBe(2);
  });
  it("atom item in group is correct setted",()=>{
    expect(ins.data.get("groupId-1").items.length).toBe(1);
    expect(ins.data.get("groupId-2").items.length).toBe(1);
  });

  function prepare(){
    var mGroupData = new Map();
    mGroupData.set("groupId-1",{groupName:"group-name-1"});
    mGroupData.set("groupId-2",{groupName:"group-name-2"});
    var oAtomData = {
      "item-id-1":{
	name:"item-name-1",
	width:50,
	height: 40,
	groupId: "groupId-1",
	statusList:[{
	  id:"status-1",
	  name:"status-name-1",
	  image:"status-image-1",
	  isDefault:true
	}]
      },
      "item-id-2":{
	name:"item-name-2",
	width:30,
	height: 50,
	groupId: "groupId-2",
	statusList:[{
	  id:"status-2",
	  name:"status-name-2",
	  image:"status-image-2",
	  isDefault:true
	}]
      }
    };
    var groupModel = new gModel.GroupModel(mGroupData);
    var atomModel = new aModel.AtomModel(oAtomData);
    return new model.PalletModel(atomModel,groupModel);
  }
});
