"use strict";
class PropertyModel{
  constructor(mData){
	
  };
  get xPosition(){
    return this._xPosition;
  }
  set xPosition(value){
    this._xPosition = value;
  };
  get yPosition(){
    return this._yPosition;
  };
  set yPosition(value){
    this._yPosition = value;
  };
  get width(){
    return this._width;
  };
  set width(width){
    this._width = width;
  };
  get height(){
    return this._height;
  };
  set height(height){
    this._height = height;
  };
};

export {PropertyModel};
