import { BLENDMODE_CONSTANT_ALPHA, BLEND_ADDITIVEALPHA, BLEND_NONE, Color, StandardMaterial } from "playcanvas";
import { AssetLoader } from "./assetLoader";

export class AssetConfig {
  static config(){
    this._configCar("PolygonCity_Texture_01_A", "car_police");
  }

  static _configObject(texture, keyModel){
    let material = new StandardMaterial();
    material.diffuseMap = AssetLoader.getAssetByKey(texture).resource;
    material.update();

    let model = AssetLoader.getAssetByKey(keyModel).resource;
    model.meshInstances.forEach((mesh) => {
      mesh.material = material;
    });
  }

  static _configCar(texture, keyModel){
    let material = new StandardMaterial();
    material.diffuseMap = AssetLoader.getAssetByKey(texture).resource;
    material.update();

    let materialColor = new StandardMaterial();
    materialColor.diffuse = new Color(50/255, 85/255, 85/255);
    materialColor.opacity = 0.2;
    materialColor.blendType = BLEND_ADDITIVEALPHA;
    materialColor.update();

    let model = AssetLoader.getAssetByKey(keyModel).resource;
    model.meshInstances.forEach((mesh) => {
      mesh.material = material;
      model.meshInstances[1].material = materialColor;

    });
  }
}