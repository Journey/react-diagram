import {AtomModel} from "./AtomModel";

class PalletItemModel {
    constructor(id, sName, image) {
        this.id = id;
        this.name = sName;
        this.image = image;
        this.width = 50;
        this.height = 50;
    }
};

class PalletModel {
    constructor(atomModel, groupModel) {
        var map = new Map();
        for (let group of groupModel.data) {
            let groupId = group[0];
            map.set(groupId, {
                "groupName": groupModel.getGroupNameById(groupId),
                "items": []
            });
        };

        for (let item of atomModel.data) {
            let itemId = item[0];
            let groupId = atomModel.getGroupIdByItemId(itemId);
            let name = atomModel.getItemNameById(itemId);
            let image = atomModel.getDefaultImageById(itemId);
            console.assert(map.has(groupId), `GroupModel does not have groupId-${groupId} from AtomModel`);
            map.get(groupId).items.push(new PalletItemModel(itemId, name, image));
        }
        this._mData = map;
    };
    get data() {
        return this._mData;
    };
}

export {
    PalletModel
};
