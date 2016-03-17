"use strict";
jest.dontMock('../../app/js/DataModel');
jest.dontMock('../../app/js/GroupModel');
const model = require('../../app/js/GroupModel');

describe("GroupModel Test",()=>{
  var ins;
  prepare();
  it("getGroupNameById", ()=>{
    var actual = ins.getGroupNameById("id-1");
    expect("group-name-1").toBe(actual);
  });
  function prepare(){
    var map = new Map();
    map.set("id-1",{groupName:"group-name-1"});
    map.set("id-2",{groupName:"group-name-2"});
    ins = new model.GroupModel(map);
  };
});
