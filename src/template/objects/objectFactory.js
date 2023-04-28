import { Entity } from "playcanvas";
import { AssetLoader } from "../../assetLoader/assetLoader";

export class ObjectFactory {
  static createModel(modelAsset, animationAssets){
    let entity = new Entity();
    entity.addComponent("model", {
      asset: AssetLoader.getAssetByKey(modelAsset)
    });
    return entity;
  }
}