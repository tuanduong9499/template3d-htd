import { Color, Entity, Vec2, Vec4 } from "playcanvas";
import { AssetLoader } from "../assetLoader/assetLoader";

export class ObjectFactory {
  static createModel(modelAsset){
    let entity = new Entity();
    entity.addComponent("model", {
      asset : AssetLoader.getAssetByKey(modelAsset),
    });
    return entity;
  }

  static createBackgroundPanel(color, anchor){
    let bgPanel = new Entity();
    bgPanel.addComponent("element", {
      type : "image",
      color : color,
      pivot : new Vec2(0.5, 0.5),
      anchor : anchor,
      useInput : true
    });
    return bgPanel;
  }

  static createTextElement(text, width, height){
    let fontAsset = AssetLoader.createCanvasFont(
      "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM/():",
      "Calibri",
      32,
      "normal"
    );
    let textElement = new Entity();
    textElement.addComponent("element", {
      type: "text",
      fontAsset: fontAsset,
      pivot : new Vec2(0.5, 0.5),
      text : text,
      anchor : new Vec4(0.5, 0.5, 0.5, 0.5),
      useInput : true,
      width : width,
      height,
    });
    return textElement;
  }

  static createButton(text, anchor, width, height, opacity){
    let button = new Entity();
    button.addComponent("element", {
      type : "image",
      color: new Color(0.2, 0.7, 0.8),
      pivot: new Vec2(0.5, 0.5),
      anchor: anchor,
      width : width,
      height : height,
      useInput: true,
      opacity : opacity
    });

    let fontAsset = AssetLoader.createCanvasFont(
      "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM/():",
      "Calibri",
      32,
      "normal"
    );
    let content = new Entity();
    content.addComponent("element", {
      type : "text",
      fontAsset: fontAsset,
      text: text,
      pivot : new Vec2(0.5, 0.5),
      anchor : new Vec4(0.5, 0.5, 0.5, 0.5),
      width : 200,
      height : 200,
      useInput : true
    });
    button.addChild(content);
    return button;
  }
}