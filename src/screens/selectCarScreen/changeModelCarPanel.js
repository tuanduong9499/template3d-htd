import { Color, Entity, Vec2, Vec4 } from "playcanvas";
import { AssetLoader } from "../../assetLoader/assetLoader";
import { ObjectFactory } from "../../template/objectFactory";

export const buttonChangeCarEvent = Object.freeze({
  btnPolice : "btn_Police",
  btnTaxi : "btn_taxi"
});

export class ChangeModelCarPanel extends Entity {
  constructor(){
    super();
    this.addComponent("element", {
      type : "image",
      color : new Color(0, 0, 0),
      opacity : 0,
      pivot: new Vec2(0.5, 0.5),
      anchor : new Vec4(0.3, 0.1, 0.7, 0.2),
      useInput: true,
    });
    this._initButton();
  }

  _initButton(){
    this.button1 = ObjectFactory.createButton("Police", new Vec4(0, 0.5, 0, 0.5), 150, 100);
    this.addChild(this.button1);
    this.button1.element.on("mousedown", () => {
      this.fire("tap", buttonChangeCarEvent.btnPolice);
    });

    this.button2 = ObjectFactory.createButton("Taxi", new Vec4(1, 0.5, 1, 0.5), 150, 100);
    this.addChild(this.button2);
    this.button2.element.on("mousedown", () => {
      this.fire("tap", buttonChangeCarEvent.btnTaxi);
    });
  }
  
}