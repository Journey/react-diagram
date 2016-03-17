"use strict";
class DataModel{
    constructor(mData){
	if(!this._className){
	    this._className = DataModel.name;
	}
	var sError = `${this._className}:constructor need a Map type as parameter`;
	mData = this._processData( mData );
      console.assert(mData instanceof Map, sError);
      this._mData = mData;
    };
    _processData(oData){
	//override it if neccessary
	return oData;
    };
    get data(){
	return this._mData;
    };
    set data(value){
	throw new Error(`${this._className}:- you can not set value to groupData`);
    };
};

export {DataModel};
