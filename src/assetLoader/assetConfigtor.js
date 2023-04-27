import { BLENDMODE_CONSTANT_ALPHA, BLEND_ADDITIVEALPHA, BLEND_NONE, Color, StandardMaterial, Texture, app } from "playcanvas";
import { AssetLoader } from "./assetLoader";

export class AssetConfig {
  static config(app){
    this._configCar("PolygonCity_Texture_01_A", "car_police");
    this._configSkyboxCubemap(app);
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

  static _configSkyboxCubemap(app) {
    let textures = [
      AssetLoader.getAssetByKey("negx"),
      AssetLoader.getAssetByKey("negy"),
      AssetLoader.getAssetByKey("negz"),
      AssetLoader.getAssetByKey("posx"),
      AssetLoader.getAssetByKey("posy"),
      AssetLoader.getAssetByKey("posz"),
    ];
    let cmSkybox = new Texture(app.graphicsDevice, {
      cubemap: true,
    });
    cmSkybox.setSource(textures.map((texture) => texture.resource.getSource()));
    console.log(cmSkybox)
    AssetLoader.registerAsset(cmSkybox, "cm_skybox", "cubemap");
  }
}