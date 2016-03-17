class CanvasElementModel{
    constructor(typeId,image,width,height,xPosition,yPosition,key){
	this.typeId = typeId;
	this.image = image;
	this.width = width;
	this.height = height;
	this.xPosition = xPosition;
	this.yPosition = yPosition;
	this.key = key;
    };
    static getInstanceFromObject(obj){
	var [typeId, image,width, height, xPosition, yPosition, key] = [
	    obj.typeId,obj.image,obj.width,obj.height,obj.xPosition,obj.yPosition,obj.key
	];
	return new CanvasElementModel(typeId, image,width,height,xPosition,yPosition,key);
    };
};
class CanvasModel{
    constructor(width,height,elements,lines){
	this.width = width;
	this.height = height;
	this.elements = elements;
	this.lines = lines;
    };
    set width(width){
	this._width = width;
    };
    get width(){
	return this._width;
    };
    set height(height){
	this._height = height;
    };
    get height(){
	return this._height;
    };
    set elements(elements){
	if(elements === undefined){
	    elements = new Map();
	}
	if(elements instanceof Array){
	    elements = elements.map((item) =>{
		return new CanvasElementModel.getInstanceFromObject(item);
	    });
	}
	if(elements instanceof Map){
	    this._elements = elements;
	} else {
	    throw new Error("CanvasModel.elements need an array/map as the value.");
	}
	return this._elements;
    };
    get elements(){
	return this._elements;
    };
    set lines(lines){
	this._lines = lines;
    };
    get lines(){
	return this._lines;
    };
    addElement(element){
	this.elements.set(element.key, element);
    };
    removeElements(element){
	if(this.elements.has(element.key)){
	    this.elements.delete(element.key);
	}
    };
    addLine(line){
	
    };
    removeLine(line){
	
    };
}

export {CanvasModel};
