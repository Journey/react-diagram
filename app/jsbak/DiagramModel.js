class DiagramItemModel{
  constructor(type_id,status_id,x_position,y_position,width,height){
    console.assert(type_id !== undefined,`DiagramModel.constructor invalide type ${type_id}`);
    console.assert(status_id !== undefined,`DiagramModel.constructor invalide status ${status_id}`);
    console.assert(x_position >= 0,`DiagramModel.constructor invalide x position ${x_position}`);
    console.assert(y_position >= 0,`DiagramModel.constructor invalide y position ${y_position}`);
    console.assert(width>0,`DiagramModel.constructor invalide width ${width}`);
    console.assert(height>0,`DiagramModel.constructor invalide height ${height}`);
    
    this.typeId = type_id;
    this.statusId = status_id;
    this.xPosition = x_position;
    this.yPosition = y_position;
    this.width = width;
    this.height = height;
  };
  static getInstanceFromObject(oElement){
    return new DiagramItemModel(oElement.typeId,oElement.statusId,oElement.xPosition,oElement.yPosition,oElement.width,oElement.height);
  };
}
class DiagramModel{
  constructor(oData){
    console.assert(oData.width>0,`DiagramModel Constructor- does not have valide ${oData.width}`);
    console.assert(oData.height>0,`DiagramModel Constructor- does not have valide ${oData.height}`);
    console.assert(oData.oElements instanceof Array,`DiagramModel Constructor- elements should be an Array`);

    this._width = oData.width;
    this._height = oData.height;
    this.mElements = this._transformElementsArrayToMap( oData.oElements );
  };
  _transformElementsArrayToMap(oData){
    var _map = new Map();
    Object.keys.forEach((key)=>{
      let oItem = oData[key];
      _map.set( key,DiagramItemModel.getInstanceFromObject(oItem) );
    });
    return _map;
  };
  get width(){
    return this._width;
  };
  set width(value){
    console.assert(value > 0, "Diagrammodel.width expected number, actural ${value}");
    this._width = value;
  };
  get height(){
    return this._height;
  };
  set height(value){
    console.assert(value > 0, "Diagrammodel.height expected number, actural ${value}");
    this._height = value;
  };
  addElement(uuid,oElement){
    console.assert(this.mElements.has(uuid),`DiagramModel.addElement already has elements with id:${uuid}`);
    var mElement = DiagramItemModel.getInstanceFromObject(oElement);
    this.mElements.set(uuid,oElement);
  };
  getElement(uuid){
    console.assert(this.mElements.has(uuid),`DiagramModel.getElement does not have ${uuid}`);
    return this.mElements.get(uuid);
  };
  removeElement(uuid){
    return this.mElements.delete(uuid);
  };
};

export {DiagramItemModel,DiagramModel};
