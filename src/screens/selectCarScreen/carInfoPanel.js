import { Color, Entity, Vec2, Vec4 } from "playcanvas";
import { AssetLoader } from "../../assetLoader/assetLoader";
import { ObjectFactory } from "../../template/objectFactory";

export class CarInfoPanel extends Entity {
  constructor(){
    super();
    this.addComponent("element", {
      type : "image",
      width : 300,
      height : 200,
      anchor : new Vec4(0, 0.6, 0.4, 1),
      pivot : new Vec2(0.5, 0.5),
      opacity : 0.5,
      color : new Color(0, 0, 0)
    });
    this._initTitle();
  }

  _initTitle(){
    this.title = ObjectFactory.createTextElement("Police", 200, 200);
    this.addChild(this.title)
  }
}