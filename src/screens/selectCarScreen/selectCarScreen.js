import { Entity, SCALEMODE_BLEND, Vec2 } from "playcanvas";
import { CarInfoPanel } from "./carInfoPanel";
import { ChangeModelCarPanel } from "./changeModelCarPanel";

export class SelectCarScreen extends Entity {
  constructor(){
    super();
    this.addComponent("screen", {
      referenceResolution: new Vec2(1280, 720),
      resolution: new Vec2(1280, 720),
      scaleMode: SCALEMODE_BLEND,
      screenSpace: true,
    });
    this._initCarInfoPanel();
    this._initChangeModelCarPanel();
  }

  _initCarInfoPanel(){
    this.carInfo = new CarInfoPanel();
    this.addChild(this.carInfo);
  }

  _initChangeModelCarPanel(){
    this.changeModelCar = new ChangeModelCarPanel();
    this.addChild(this.changeModelCar);
  }
}