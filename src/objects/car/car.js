import { Entity } from "playcanvas";
import { ObjectFactory } from "../../template/objectFactory";

export class Car extends Entity {
  constructor(modelAsset, speed, power, handling){
    super();
    this.isDefault = false;
    this.speed = speed,
    this.power = power,
    this.handling = handling,
    this.name = modelAsset;
    this.addChild(ObjectFactory.createModel(modelAsset));
  }

  show(){
    this.enabled = true;
  }

  hide(){
    this.enabled = false;
  }


}