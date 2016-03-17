"use strict";
jest.dontMock('../../app/js/DataModel');
jest.dontMock('../../app/js/AtomItemStatusModel');
jest.dontMock('../../app/js/AtomItemModel');
jest.dontMock('../../app/js/AtomModel');
const model = require('../../app/js/AtomModel');

describe("AtomModel Test",()=>{
  var ins;
  function prepare(){
    var OData = {
      "item-id-1":{
	name:"item-name-1",
	width:50,
	height: 40,
	groupId: 1,
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
	groupId: 2,
	statusList:[{
	  id:"status-2",
	  name:"status-name-2",
	  image:"status-image-2",
	  isDefault:true
	}]
      }
    };
    ins = new model.AtomModel(OData);
  };
  prepare();
  it("the data have transformed to ", ()=>{
    expect(ins.data instanceof Map).toBe(true);
  });
  it("getDefaultImageById",()=>{
    expect(ins.getDefaultImageById("item-id-1")).toBeDefined();
    expect(ins.getDefaultImageById("item-id-1")).toBe("status-image-1");
  });
  it("getImageByIdAndStatus",()=>{
    expect(ins.getImageByIdAndStatus("item-id-2","status-2")).toBe("status-image-2");
  });
  it("getItemNameById",()=>{
    expect(ins.getItemNameById("item-id-2")).toBe("item-name-2");
  });
  it("getGroupIdByItemId",()=>{
    expect(ins.getGroupIdByItemId("item-id-2")).toBe(2);
  });
  it("getDefaultStatusById", ()=>{
    expect(ins.getDefaultStatusById("item-id-2").id).toBe("status-2");
  });
});
