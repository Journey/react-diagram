import {
    PalletModel
}
from "./PalletModel";
import {
    CanvasModel
}
from "./CanvasModel";
import {
    PropertyModel
}
from "./PropertyModel";
import {
    AtomModel
}
from "./AtomModel";
import {
    GroupModel
}
from "./GroupModel";

export class ComponentModel {
    constructor(atomData, groupData) {
        this.groupModel = new GroupModel(this.trnansformRawDataToGroupModelData(groupData));
        this.atomModel = new AtomModel(this.transformRawDataToAtomModelData(atomData));
        this.palletModel = new PalletModel(this.atomModel, this.groupModel);
        this.canvasModel = new CanvasModel();
        this.propertyModel = new PropertyModel();
    };
    //from json to map
    trnansformRawDataToGroupModelData(oData) {
        console.assert(oData, "Component.transformRawDataToGroupModelData need an object as the parameter");
        //todo:: replace the logic with the real logic
        var oMap = new Map();
        Object.keys(oData).forEach((key) => {
            oMap.set(key, {
                "groupName": oData[key].groupName
            });
        });
        return oMap;
    };
    //from json to map
    transformRawDataToAtomModelData(oData) {
        console.assert(oData, "Component.transformRawDataToAtomModelData need an object as it's parameter");
        return oData;
        //todo::does not need map as the parameter
        var oMap = new Map();
        /*oMap.set("atom_1",{name:"Atom 1",width:50,height: 50,groupId:"group_id_1",statusList:[{
          id:1,name:"yun xing",image:"css/1.jpg",isDefault: true
        },{
          id: 2,name:"ting ji",image:"css/1.jpg",isDefault: false
        }]});*/
        Object.keys(oData, (key) => {
            oMap.set(key, oData[key]);
        });
        return oMap;
    };
    getPalletDataModel(groupModel, atomModel) {
        var oMap = new Map();
        groupModel.keys().forEach((key, item) => {
            oMap.set(key, {
                groupName: item.groupName,
                items: []
            });
        });
        atomModel.keys().forEach((key) => {
            var itemId = key;
            var groupId = atomModel.getGroupIdByItemId(key);
            var image = atomModel.getDefaultImageById(key);
            var name = atomModel.getItemNameById(id);
            console.assert(groupModel.has(groupId), `Component.getPalletDataModel- groupId -${groupId} does not exist`);
            oMap.get(groupId).items.push({
                id: itemId,
                name: name,
                image: image
            });
        });
        return oMap;
    };
    getElementDefaultImageById(eleId) {
	return this.atomModel.getDefaultStatusById(eleId);
    };
    getElementImageSizeById(eleId) {
	return this.atomModel.getImageSizeById(eleId);
    };
}

export {
    ComponentModel
};
