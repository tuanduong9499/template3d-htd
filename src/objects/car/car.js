import { Entity } from "playcanvas";
import { ObjectFactory } from "../../template/objectFactory";

export class Car extends Entity {
  constructor(modelAsset){
    super();
    this.default = false;
    this.isActive = false;
    this.createModel(modelAsset);
    this.checkCarDefault(modelAsset);
    
  }
  
  createModel(modelAsset){
    this.addChild(ObjectFactory.createModel(modelAsset));
  }

  checkCarDefault(modelAsset){
    if(modelAsset === "car_police"){
      this.default = true;
    }
    if(this.default){
      this.show();
    }else{
      this.hide();
    }
  }

  show(){
    this.enabled = true;
  }

  hide(){
    this.enabled = false;
  }
}