import { Entity } from "playcanvas";
import { ObjectFactory } from "../../template/objects/objectFactory";

export class Character extends Entity {
  constructor(){
    super();
    this.addChild(ObjectFactory.createModel("character"));
  }
}