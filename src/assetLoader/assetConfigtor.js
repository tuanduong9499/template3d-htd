import { StandardMaterial, Texture } from "playcanvas";
import { AssetLoader } from "./assetLoader";

export class AssetConfig {
  static config(app){
    this._configSkyboxCubemap(app);
    this._configMaterialCharacter();
  }

  static _configSkyboxCubemap(app) {
    let textures = [
      AssetLoader.getAssetByKey("tex_skybox_right"),
      AssetLoader.getAssetByKey("tex_skybox_left"),
      AssetLoader.getAssetByKey("tex_skybox_up"),
      AssetLoader.getAssetByKey("tex_skybox_down"),
      AssetLoader.getAssetByKey("tex_skybox_front"),
      AssetLoader.getAssetByKey("tex_skybox_back"),
    ];
    let cmSkybox = new Texture(app.graphicsDevice, {
      cubemap: true,
    });
    cmSkybox.setSource(textures.map((texture) => texture.resource.getSource()));
    AssetLoader.registerAsset(cmSkybox, "cm_skybox", "cubemap");
  }

  static _configMaterialCharacter(){
    let material1 = new StandardMaterial();
    material1.diffuseMap = AssetLoader.getAssetByKey("Boy01_diffuse").resource;

    let material2 = new StandardMaterial();
    material2.diffuseMap = AssetLoader.getAssetByKey("Boy01_FacialAnimMap").resource;

    let model = AssetLoader.getAssetByKey("character").resource;
    console.log(model.meshInstances)
    model.meshInstances.forEach((mat, index) => {
      if(index === 0){
        mat.material = material1;
      }else{
        mat.material = material2
      }
    });
  }
}