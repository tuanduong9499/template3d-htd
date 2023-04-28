import { Entity } from "playcanvas";
import { ObjectFactory } from "../../template/objects/objectFactory";
import { AssetLoader } from "../../assetLoader/assetLoader";

export class Character extends Entity {
  constructor(){
    super();
    this.isEnable = false;
    this._createModel();
    this._initAnimation();
  }

  _createModel(){
    this.character = ObjectFactory.createModel("character");
    this.addChild(this.character);
  }

  _initAnimation(){
    this.character.addComponent("animation", {
      assets : [
        AssetLoader.getAssetByKey("anim_idle"),
        AssetLoader.getAssetByKey("anim_run")
      ],
      activate : true,
      loop : true,
    });
  }
}