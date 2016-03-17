class AtomItemStatusModel{
    constructor(id,name,image,isDefault){
      this.id = id;
	this.name = name;
	this.image = image;
	this._isDefault = isDefault;
    };
    get isDefault(){
	return !!this._isDefault;
    };
  set isDefault(value){
    if(this._isDefault === undefined){
      this._isDefault = !!value;
    } else {
      throw new Error("AtomItemStatusModel.isDefault- can not assign value to it");
    }
  };
};
export {AtomItemStatusModel};
